import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('localhost', 6060))
clients = []

if __name__ == '__main__':
    print('Start Server')
    while True:
        data, addres = sock.recvfrom(1024)
        print(addres[0], addres[1])
        if addres not in clients:
            clients.append(addres)
        for client in clients:
            if client == addres:
                continue
            sock.sendto(data, client)