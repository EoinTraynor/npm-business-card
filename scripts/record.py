#!/usr/bin/env python3
import json
import os
import pty
import select
import sys
import time

def record():
    cast_path = "docs/assets/demo.cast"
    
    events = []
    current_time = 0.0
    
    def emit(text, advance_seconds=0.0):
        nonlocal current_time
        if text:
            events.append([round(current_time, 3), "o", text])
        current_time += advance_seconds

    # Initial prompt
    emit("\x1b[32m~\x1b[0m \x1b[1m$\x1b[0m ", 0.6)
    
    # Type: npx eointraynor
    cmd = "npx eointraynor"
    for ch in cmd:
        emit(ch, 0.09)
    emit("\r\n", 0.4)
    
    # Run node dist/index.js in a PTY
    master, slave = pty.openpty()
    pid = os.fork()
    if pid == 0:
        os.close(master)
        os.setsid()
        os.dup2(slave, 0)
        os.dup2(slave, 1)
        os.dup2(slave, 2)
        os.close(slave)
        
        env = dict(os.environ)
        env["TERM"] = "xterm-256color"
        env["PATH"] = "/home/rod/.nvm/versions/node/v22.4.1/bin:/home/rod/.local/bin:" + env.get("PATH", "")
        os.execvpe("node", ["node", "dist/index.js"], env)
    else:
        os.close(slave)
        
        def read_chunk(timeout=0.6):
            chunks = []
            t_end = time.time() + timeout
            while time.time() < t_end:
                r, _, _ = select.select([master], [], [], 0.05)
                if master in r:
                    try:
                        data = os.read(master, 4096)
                        if data:
                            chunks.append(data.decode("utf-8", errors="replace"))
                    except OSError:
                        break
            return "".join(chunks)

        # 1. Read initial card + menu render
        initial_out = read_chunk(1.2)
        # Display card and give viewer 2.5 seconds to read
        emit(initial_out, 2.5)
        
        # 2. Down arrow -> GitHub
        os.write(master, b"\x1b[B")
        out = read_chunk(0.3)
        emit(out, 1.4)
        
        # 3. Down arrow -> LinkedIn
        os.write(master, b"\x1b[B")
        out = read_chunk(0.3)
        emit(out, 1.4)
        
        # 4. Down arrow -> Twitter/X
        os.write(master, b"\x1b[B")
        out = read_chunk(0.3)
        emit(out, 1.4)
        
        # 5. Down arrow -> View About & Bio
        os.write(master, b"\x1b[B")
        out = read_chunk(0.3)
        emit(out, 1.6)
        
        # 6. Press Enter to view bio
        os.write(master, b"\r")
        out = read_chunk(0.6)
        # Give 3.5 seconds to read the bio!
        emit(out, 3.5)
        
        # 7. Down arrow to Exit (option 6 from top)
        for _ in range(5):
            os.write(master, b"\x1b[B")
            time.sleep(0.05)
        out = read_chunk(0.3)
        emit(out, 1.5)
        
        # 8. Press Enter on Exit
        os.write(master, b"\r")
        out = read_chunk(0.5)
        emit(out, 2.5)
        
        try:
            os.waitpid(pid, 0)
        except ChildProcessError:
            pass
            
        header = {
            "version": 2,
            "width": 68,
            "height": 22,
            "timestamp": int(time.time()),
            "env": {"SHELL": "/bin/bash", "TERM": "xterm-256color"}
        }
        
        with open(cast_path, "w", encoding="utf-8") as f:
            f.write(json.dumps(header) + "\n")
            for ev in events:
                f.write(json.dumps(ev) + "\n")
                
        print(f"Recorded {len(events)} events with relaxed pacing (total duration: {current_time:.1f}s)")

if __name__ == "__main__":
    record()
