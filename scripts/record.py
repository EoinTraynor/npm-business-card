#!/usr/bin/env python3
import json
import os
import pty
import select
import sys
import time

def record():
    cast_path = "docs/assets/demo.cast"
    gif_path = "docs/assets/npx-eointraynor.gif"
    
    events = []
    current_time = 0.0
    
    def emit(text, delta=0.05):
        nonlocal current_time
        current_time = round(current_time + delta, 3)
        events.append([current_time, "o", text])
        
    # Initial prompt
    emit("\x1b[32m~\x1b[0m \x1b[1m$\x1b[0m ", 0.0)
    
    # Type: npx eointraynor
    cmd = "npx eointraynor"
    for ch in cmd:
        emit(ch, 0.08)
    emit("\r\n", 0.3)
    
    # Now run node dist/index.js in a PTY to capture the real terminal output
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
        
        start_real = time.time()
        def read_output(duration):
            t_end = time.time() + duration
            while time.time() < t_end:
                r, _, _ = select.select([master], [], [], 0.05)
                if master in r:
                    try:
                        data = os.read(master, 4096)
                        if data:
                            emit(data.decode("utf-8", errors="replace"), 0.08)
                    except OSError:
                        break
        
        # Capture card and menu
        read_output(1.5)
        
        # Navigate menu: GitHub
        os.write(master, b"\x1b[B")
        read_output(0.8)
        
        # Navigate menu: LinkedIn
        os.write(master, b"\x1b[B")
        read_output(0.8)
        
        # Navigate menu: Twitter/X
        os.write(master, b"\x1b[B")
        read_output(0.8)
        
        # Navigate menu: Bio
        os.write(master, b"\x1b[B")
        read_output(1.0)
        
        # Press Enter on Bio
        os.write(master, b"\r")
        read_output(2.5)
        
        # Navigate to Exit
        for _ in range(5):
            os.write(master, b"\x1b[B")
            read_output(0.2)
        read_output(0.8)
        
        # Press Enter to Exit
        os.write(master, b"\r")
        read_output(1.2)
        
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
                
        print(f"Recorded {len(events)} events to {cast_path}")

if __name__ == "__main__":
    record()
