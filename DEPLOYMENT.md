# Deployment

This website is deployed to Oracle Cloud Infrastructure (OCI)

## Oracle Create A Server

Create a compute instance (the ARM Ampere processors are more powerful, but still eligible for Always Free Tier) (you may be able to reduce the OCPU count and Memory to be able to have more servers)
- Shape: VM.Standard.A1.Flex
- OCPU count: 4
- Memory (GB): 24

Save the private key or upload your own public key. Also, note down the public IP address

Create an ingress rule for TCP ports 80 and 443 on the subnet's security list
- Stateless: off
- Source CIDR: 0.0.0.0/0
- IP Protocol: TCP
- Source Port Range: Empty
- Destination Port Range: 80,443

You should be able to connect to the server with:
```bash
ssh -i ~/.ssh/<privkey> ubuntu@<instance-public-ip-address>
```

## DNS Setup
Create an A record for vandylifts.com with the contents of the public ip address

## Server Setup
Once you have connected to the server, you will want to update the server
```bash
sudo apt update
sudo apt upgrade
```
You may want to reboot the server now
```bash
sudo reboot
```

## Node setup
I like using Node Version Manager (https://github.com/nvm-sh/nvm). The following installs NVM and the latest version of Node.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
nvm install node
```

## Python setup
Python should already be installed.

## Download the repository
From inside home directory:
```bash
git clone https://github.com/VandyLifts-Website/website.git
```

## Install Python dependencies
```bash
cd ~/website/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

## Django Secret Key
From inside `~/website/backend`, run the following to create the secret key:
```bash
echo "export SECRET_KEY='$(openssl rand -hex 40)'" > .DJANGO_SECRET_KEY
```
Add another line to the file with the contents `export EMAIL_PASSWORD='<gmail app password>'` with the Gmail App Password of the gmail that sends emails to matches (https://support.google.com/mail/answer/185833?hl=en)
```bash
nano .DJANGO_SECRET_KEY
```
And run the following to load the secret key
```bash
source .DJANGO_SECRET_KEY
```

## Django Database Setup
Run migrate to apply database migrations and createsuperuser to create a admin account that can make other accounts admins (consider deleting that admin later)
```bash
python manage.py migrate
python manage.py createsuperuser
```

## Create gunicorn log files
```bash
sudo mkdir -pv /var/{log,run}/gunicorn/
sudo chown -cR ubuntu:ubuntu /var/{log,run}/gunicorn/
```

## Launch gunicorn
```bash
gunicorn -c config/gunicorn/prod.py
```
Sometimes stopping the previous gunicorn process helped:
```bash
killall gunicorn
```

## Add inbound rule to iptables firewall
Be extremely careful with the following commands. Duplicate the rule to allow port 22 to allow ports 80 and 443 (don't change anything else and reread your newlines to make sure they are exactly copied)
```bash
sudo vim /etc/iptables/rules.v4
sudo iptables-restore < /etc/iptables/rules.v4
```
The new lines should look something like (the original port 22 line should still exist):
```
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
```



## Build Frontend
```bash
cd ~/website/frontend
npm install
npm run build
cd ~/website/backend
python manage.py collectstatic
```

## Collect the static files
```bash
sudo mkdir -pv /var/www/vandylifts.com/static/
sudo chown ubuntu:ubuntu /var/www/vandylifts.com/static/
cd ~/website/backend
python manage.py collectstatic
```


## Install Nginx
```bash
sudo apt install nginx
sudo cp ~/website/vandylifts /etc/nginx/sites-available/vandylifts
sudo ln -s /etc/nginx/sites-available/vandylifts /etc/nginx/sites-enabled
sudo systemctl restart nginx
sudo systemctl status nginx
```

## Install Certbot
```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx --rsa-key-size 4096 --no-redirect
sudo systemctl restart nginx
sudo systemctl status nginx
```

## Debugging commands
```bash
# Nginx error log
cat /var/log/nginx/vandylifts.error.log

# Gunicorn error log
cat /var/log/gunicorn/error.log

# Gunicorn access log
cat /var/log/gunicorn/access.log

# Stop gunicorn and rerun it in debug mode (do not leave in debug mode!)
killall gunicorn; DJANGO_DEBUG=True gunicorn -c config/gunicorn/prod.py
```

## Commands to rerun
```bash
# Keep the system up to date
sudo apt update
sudo apt upgrade

# Download any changes to the repository
cd ~/website
git pull

# Load the Python virtual environment and secret keys
cd ~/website/backend
source venv/bin/activate
source .DJANGO_SECRET_KEY

# Run any database migrations
python manage.py migrate

# Build the frontend
cd ~/website/frontend
npm install
npm run build
cd ~/website/backend
python manage.py collectstatic

# Stop gunicorn and rerun it
killall gunicorn
gunicorn -c config/gunicorn/prod.py

# Restart nginx
sudo systemctl restart nginx
```

## Configuring OAuth
- Go to the admin page at https://vandylifts.com/admin/
- Login with the superuser created earlier
- Then, create a Social Application
  - Provider: Google
  - Name: VandyLifts
  - Client id: \<client id>
  - Secret key: \<secret key>

## Make a user an Admin
Once a user has logged in with OAuth (signin button on home page), they can be made an admin by giving them staff and superuser permissions

## 
  
