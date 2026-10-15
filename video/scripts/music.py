"""Generates the soundtrack for the Augenblick video, entirely in code (no samples, no
third-party material), so all rights stay with the project.

    python3 scripts/music.py            # -> public/audio/musik.wav (then see README)

Bright, upbeat pop at ~119 BPM in G major (G – D – Em – C). The arrangement follows the
video: a plucked build-up under the hook, the beat drops when the intro starts, a bell
accent on "Resonanz", a swell into the second spin, and the final chord on the logo.
Cue times are in seconds and mirror src/config/timing.ts (units / 30).
"""

import os
import wave

import numpy as np

SR = 44100
U = 1 / 30  # one timing unit of the video

# --- cues from the video (src/config/timing.ts, src/poses.ts) -----------------------
TOTAL = 1030 * U  # 34.33 s
HOOK_SPIN = 86 * U  # card spins into the phone
INTRO = 116 * U  # beat drops here
RESONANZ = (384 + 50) * U  # the two notes overlap
SAFETY_SPIN = 648 * U  # Events -> Schutz spin
CLOSING = 904 * U  # drums stop, logo scene
LOGO = (904 + 34) * U  # the circles meet: final chord

# 13 bars of 4 beats exactly between the drop and the closing scene
BEAT = (CLOSING - INTRO) / 52
BAR = 4 * BEAT

rng = np.random.default_rng(7)
N = int(TOTAL * SR) + SR
L = np.zeros(N)
R = np.zeros(N)
duck_src = []  # kick times for the sidechain pump


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(sig, t0, gain=1.0, pan=0.0, bus=None):
    """Mix a mono signal in at time t0 (s); pan -1..1."""
    i = int(t0 * SR)
    if i >= N or i + len(sig) <= 0:
        return
    if i < 0:
        sig, i = sig[-i:], 0
    sig = sig[: N - i] * gain
    lg, rg = np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    tl, tr = (L, R) if bus is None else bus
    tl[i : i + len(sig)] += sig * lg
    tr[i : i + len(sig)] += sig * rg


def tvec(dur):
    return np.arange(int(dur * SR)) / SR


def env(t, attack=0.004):
    return np.minimum(1.0, t / attack)


# --- instruments ----------------------------------------------------------------------
def pluck(f, dur=0.5, bright=8, decay=5.0):
    t = tvec(dur)
    out = np.zeros_like(t)
    for h in range(1, bright + 1):
        if f * h > 12000:
            break
        out += np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6)) * np.exp(-t * (decay + 2.4 * h)) / h**1.1
    return out * env(t)


def marimba(f, dur=0.6):
    t = tvec(dur)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 7)
    s += 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 28)
    s += 0.12 * np.sin(2 * np.pi * f * 9.2 * t) * np.exp(-t * 45)
    return s * env(t, 0.002)


def bell(f, dur=3.0):
    t = tvec(dur)
    s = np.zeros_like(t)
    for ratio, amp, dec in [(1, 1, 1.4), (2.0, 0.5, 2.2), (2.76, 0.35, 3.0), (4.07, 0.22, 4.5), (5.4, 0.12, 6)]:
        s += amp * np.sin(2 * np.pi * f * ratio * t) * np.exp(-t * dec)
    return s * env(t, 0.003)


def pad(freqs, dur, attack=0.4, release=1.2):
    t = tvec(dur)
    s = np.zeros_like(t)
    for f in freqs:
        for d in (-0.004, 0, 0.004):
            s += np.sin(2 * np.pi * f * (1 + d) * t + rng.uniform(0, 6))
            s += 0.25 * np.sin(2 * np.pi * 2 * f * (1 + d) * t)
    e = np.minimum(1, t / attack) * np.clip((dur - t) / release, 0, 1)
    return s * e / (len(freqs) * 3)


def bass(f, dur):
    t = tvec(dur)
    s = sum(np.sin(2 * np.pi * f * h * t) / h for h in range(1, 7))
    e = env(t, 0.006) * np.exp(-t * 3.0) * np.clip((dur - t) / 0.02, 0, 1)
    return np.tanh(1.6 * s * e)


def kick():
    t = tvec(0.45)
    f = 46 + 95 * np.exp(-t * 32)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t * 7.5)
    s[: int(0.003 * SR)] += rng.uniform(-0.6, 0.6, int(0.003 * SR))  # click
    return np.tanh(1.4 * s)


def clap():
    t = tvec(0.25)
    n = rng.uniform(-1, 1, len(t))
    n = n - np.roll(n, 1)  # brighter
    e = np.zeros_like(t)
    for k, off in enumerate((0, 0.011, 0.022)):
        e += np.where(t >= off, np.exp(-(t - off) * (90 if k < 2 else 22)), 0)
    body = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30) * 0.4
    return (n * e * 0.5 + body) * 0.9


def hat(open_=False):
    t = tvec(0.25 if open_ else 0.06)
    n = rng.uniform(-1, 1, len(t))
    n = n - np.roll(n, 1)
    return n * np.exp(-t * (14 if open_ else 70)) * 0.5


def riser(dur, peak=1.0):
    """Noise swell with a rising one-pole low-pass (a soft 'whoosh')."""
    t = tvec(dur)
    n = rng.uniform(-1, 1, len(t))
    out = np.zeros_like(n)
    y = 0.0
    cut = 0.01 + 0.5 * (t / dur) ** 2
    for i in range(len(n)):  # short loop, fine for ~1 s
        y += cut[i] * (n[i] - y)
        out[i] = y
    return out * (t / dur) ** 2 * peak


# --- harmony ---------------------------------------------------------------------------
CHORDS = {  # voicings around the middle of the keyboard, bass root
    'G': ([55, 59, 62, 67], 43),
    'D': ([57, 62, 66, 69], 38),
    'Em': ([55, 59, 64, 67], 40),
    'C': ([55, 60, 64, 67], 36),
}
PROG = ['G', 'D', 'Em', 'C']
MELODY = {  # (beat, midi) per chord – G major pentatonic, bouncy
    'G': [(0, 71), (0.5, 74), (1, 76), (2, 74), (2.5, 71), (3, 69)],
    'D': [(0, 69), (0.5, 71), (1, 74), (2, 74), (3, 69), (3.5, 71)],
    'Em': [(0, 71), (1, 76), (1.5, 79), (2.5, 76), (3, 74)],
    'C': [(0, 72), (0.5, 76), (1, 79), (2, 76), (3, 74), (3.5, 71)],
}

music_bus = (np.zeros(N), np.zeros(N))  # chords + bass, pumped by the kick

# Build-up under the hook: two bars before the drop (C, D), plucks getting brighter.
for b, name in ((-2, 'C'), (-1, 'D')):
    start = INTRO + b * BAR
    notes, root = CHORDS[name]
    for k in range(8):
        tt = start + k * BEAT / 2
        if tt < 0:
            continue
        lift = np.clip((tt) / INTRO, 0.15, 1)
        for j, m in enumerate(notes):
            add(pluck(mtof(m), 0.45, bright=int(3 + 6 * lift)), tt + j * 0.006, 0.10 * (0.4 + 0.6 * lift), pan=(j - 1.5) * 0.3)
    if b == -1:
        for k in range(8):
            add(hat(), start + k * BEAT / 2, 0.35 * (k + 1) / 8, pan=0.3)
add(riser(INTRO - HOOK_SPIN, 0.5), HOOK_SPIN, pan=-0.2)
add(riser(INTRO - HOOK_SPIN, 0.5), HOOK_SPIN, pan=0.2)

# Groove: 13 bars from the drop to the closing scene.
for bar in range(13):
    start = INTRO + bar * BAR
    name = PROG[bar % 4]
    notes, root = CHORDS[name]
    for beat in range(4):
        tb = start + beat * BEAT
        add(kick(), tb, 0.62)
        duck_src.append(tb)
        if beat in (1, 3):
            add(clap(), tb, 0.5, pan=0.05)
        add(hat(), tb + BEAT / 2, 0.32, pan=0.35)
        add(hat(), tb, 0.16, pan=0.35)
        # chord stabs on the off-beats, softer on the beat
        for j, m in enumerate(notes):
            add(pluck(mtof(m), 0.35, bright=9), tb + BEAT / 2 + j * 0.004, 0.14, pan=(j - 1.5) * 0.35, bus=music_bus)
            add(pluck(mtof(m), 0.3, bright=6), tb + j * 0.004, 0.04, pan=(j - 1.5) * 0.35, bus=music_bus)
        # bass: 8ths, octave jump on the "and" of 2 and 4
        for e8 in range(2):
            m = root + (12 if (beat % 2 == 1 and e8 == 1) else 0)
            add(bass(mtof(m), BEAT / 2 * 0.9), tb + e8 * BEAT / 2, 0.17, bus=music_bus)
    if bar % 4 == 3:
        add(hat(True), start + 3.5 * BEAT, 0.25, pan=0.35)
    # melody from bar 4 (resonance scene) on, pausing for two bars around the spin
    if bar >= 4 and bar not in (8, 9):
        for beat_pos, m in MELODY[name]:
            add(marimba(mtof(m)), start + beat_pos * BEAT, 0.32, pan=0.25)
            add(marimba(mtof(m + 12)), start + beat_pos * BEAT + 0.012, 0.05, pan=-0.3)

# Bell chord on "Resonanz" (G major add9, high).
for j, m in enumerate([79, 83, 86, 81]):
    add(bell(mtof(m), 3.2), RESONANZ + j * 0.03, 0.12, pan=(j - 1.5) * 0.4)

# Swell into the Events -> Schutz spin, peaking at the fastest point of the turn.
spin_mid = SAFETY_SPIN + 17 * U
add(riser(spin_mid - (SAFETY_SPIN - 0.5), 0.45), SAFETY_SPIN - 0.5, pan=0.2)
add(riser(spin_mid - (SAFETY_SPIN - 0.5), 0.45), SAFETY_SPIN - 0.5, pan=-0.2)

# Closing: drums stop, a pad and a last arpeggio, final chord rings out on the logo.
add(pad([mtof(m) for m in (55, 59, 62, 67)], LOGO - CLOSING + 0.4, attack=0.15, release=0.4), CLOSING, 0.5)
for k, m in enumerate([67, 71, 74, 79]):
    add(pluck(mtof(m), 0.8, bright=8, decay=3), CLOSING + k * BEAT / 2, 0.10, pan=(k - 1.5) * 0.3)
final = [43, 55, 59, 62, 67, 69, 74]
for j, m in enumerate(final):
    add(pluck(mtof(m), TOTAL - LOGO + 0.5, bright=7, decay=0.9), LOGO + j * 0.012, 0.10 if m > 50 else 0.3, pan=(j - 3) * 0.2)
add(pad([mtof(m) for m in (55, 59, 62, 69)], TOTAL - LOGO, attack=0.05, release=2.5), LOGO, 0.45)
for j, m in enumerate([86, 91]):
    add(bell(mtof(m), 3.0), LOGO + 0.02 * j, 0.07, pan=0.3 - 0.6 * j)

# --- mix ---------------------------------------------------------------------------------
t_all = np.arange(N) / SR
pump = np.ones(N)
for k in duck_src:
    i = int(k * SR)
    seg = t_all[: min(N - i, int(0.35 * SR))]
    pump[i : i + len(seg)] = np.minimum(pump[i : i + len(seg)], 1 - 0.45 * np.exp(-seg * 11))
L += music_bus[0] * pump
R += music_bus[1] * pump


def reverb(x, seconds=1.4, mix=0.18):
    n = int(seconds * SR)
    ir = rng.uniform(-1, 1, n) * np.exp(-np.arange(n) / SR * 4.5)
    ir[0] = 0
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    wet /= np.max(np.abs(wet)) + 1e-9
    return x + mix * wet * np.max(np.abs(x))


L, R = reverb(L), reverb(R)
L, R = L[: int(TOTAL * SR)], R[: int(TOTAL * SR)]

# fade the very end, soft-clip, normalise
fade = int(0.8 * SR)
L[-fade:] *= np.linspace(1, 0, fade)
R[-fade:] *= np.linspace(1, 0, fade)
peak = max(np.max(np.abs(L)), np.max(np.abs(R)))
L, R = np.tanh(1.3 * L / peak) / np.tanh(1.3), np.tanh(1.3 * R / peak) / np.tanh(1.3)
L, R = L * 0.89, R * 0.89

out = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'musik.wav')
pcm = (np.stack([L, R], axis=1) * 32767).astype('<i2')
with wave.open(out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f'{out}  {TOTAL:.2f} s  {60 / BEAT:.1f} BPM')
