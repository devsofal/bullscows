import eel
import time

if __name__ == '__main__':

    @eel.expose
    def count(s: str, line: str):
        bull = 0
        for i in range(4):
            if line[i] == s[i]:
                bull += 1
        cows = 0
        for ch in line:
            cows += (s.find(ch) != -1)
        return bull, cows - bull

    @eel.expose
    def connect(alias: str):
        import socket

        global sor
        global server

        server = 'localhost', 6060
        sor = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sor.bind(('', 0))
        sor.sendto(('[' + alias + '] Connect to server').encode(), server)

    @eel.expose
    def communicate(outgoing: str):
        import socket
        import threading
        global sor
        global server

        def read_sok():
            data = sor.recv(1024)
            eel.rewrite_inc(data.decode())
            print("incoming = ", data.decode())

        potok = threading.Thread(target=read_sok)
        potok.start()

        print('outgoing = ', outgoing)
        sor.sendto(outgoing.encode(), server)


    eel.init("web")
    eel.start("index.html", size = (600, 400))