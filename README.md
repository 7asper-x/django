# Django Project Circle
> **Project Website:**  [The Circle Game](https://app4109.acapp.acwing.com.cn/)

This is a Django learning toy project.

## Development
> **Note:** This project is developed using Python 3.6.5 and Django 2.1.1
### Environment
1. AWS EC2 Ubuntu 20.04
2. Docker, all the project related environment is in Docker
3. Django 2.1.1
4. Jquery 3.5.1

### Commands
#### Build Environment
1. `scp django_lesson_1_0.tar [server]` to send the docker image to the server
2. `docker load -i django_lesson_1_0.tar` to load the docker image
3. `docker run -p 20000:22 -p 8000:8000 --name django_server -itd django_lesson_1_0:1.0` to run the docker image
4. `adduser [username]` to add a user in the container  
`usermod -aG sudo [username]` to add the user to sudo group
5. `ssh-copy-id [username]@[server]` to copy the ssh key to the server
6. `scp .vimrc .tmux.conf [username]@[server]:/home/[username]` to copy the vim and tmux config to the server

