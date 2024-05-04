import subprocess
import os

def single_execute(command):
    command = command.decode("utf-8")
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    for c in iter(lambda: process.stdout.read(1), b""):
        yield c

def manage_command(command):
    command = command.decode("utf-8")
    result = os.popen(command).read()
    return result