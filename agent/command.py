import os

def execute(command):
    command = command.decode("utf-8")
    result = os.popen(command).read()
    return result