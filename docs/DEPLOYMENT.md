# MediVars Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas or self-hosted MongoDB
- Domain name and SSL certificate
- Cloud hosting (AWS, DigitalOcean, Heroku, etc.)

## Backend Deployment

### 1. Environment Variables
Create production `.env` file:

```env
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medivars

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (SendGrid/Gmail)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs
FRONTEND_URL=https://medivars.com
DOCTORS_URL=https://doctors.medivars.com
ADMIN_URL=https://admin.medivars.com
```

### 2. Build and Deploy

**Using PM2 (Recommended):**
```bash
# Install PM2 globally
npm install -g pm2

# Build and start
cd backend
npm install --production
pm2 start src/server.js --name "medivars-api"
pm2 startup
pm2 save
```

**Using Docker:**
```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Frontend Applications Deployment

### 1. Build Applications
```bash
# Frontend
cd frontend
npm run build

# Doctors Portal  
cd ../doctors-portal
npm run build

# Admin Panel
cd ../admin-panel
npm run build
```

### 2. Deploy to Static Hosting

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy frontend
cd frontend/dist
netlify deploy --prod

# Deploy doctors portal
cd ../../doctors-portal/dist  
netlify deploy --prod

# Deploy admin panel
cd ../../admin-panel/dist
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy each application
cd frontend && vercel --prod
cd ../doctors-portal && vercel --prod
cd ../admin-panel && vercel --prod
```

**AWS S3 + CloudFront:**
```bash
# Install AWS CLI
aws configure

# Sync to S3
aws s3 sync frontend/dist s3://medivars-frontend
aws s3 sync doctors-portal/dist s3://medivars-doctors
aws s3 sync admin-panel/dist s3://medivars-admin

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Database Setup

### MongoDB Atlas
1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

### Self-hosted MongoDB
```bash
# Install MongoDB
sudo apt update
sudo apt install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
use medivars
db.createUser({
  user: "medivars_user",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

## SSL Certificate

### Using Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d api.medivars.com
sudo certbot certonly --standalone -d medivars.com
sudo certbot certonly --standalone -d doctors.medivars.com
sudo certbot certonly --standalone -d admin.medivars.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Nginx Configuration

```nginx
# /etc/nginx/sites-available/medivars
server {
    listen 80;
    server_name api.medivars.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.medivars.com;
    
    ssl_certificate /etc/letsencrypt/live/api.medivars.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.medivars.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 443 ssl;
    server_name medivars.com;
    
    ssl_certificate /etc/letsencrypt/live/medivars.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/medivars.com/privkey.pem;
    
    root /var/www/medivars-frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment-Specific Configurations

### Frontend Environment Variables
Create `.env.production` files:

**frontend/.env.production:**
```env
VITE_API_URL=https://api.medivars.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
```

**doctors-portal/.env.production:**
```env
VITE_API_URL=https://api.medivars.com
```

**admin-panel/.env.production:**
```env
VITE_API_URL=https://api.medivars.com
```

## Monitoring and Logging

### PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs medivars-api

# Restart application
pm2 restart medivars-api
```

### Log Management
```bash
# Install log rotation
sudo apt install logrotate

# Configure log rotation
sudo nano /etc/logrotate.d/medivars
```

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure environment variables
- [ ] Enable MongoDB authentication
- [ ] Configure firewall (UFW/iptables)
- [ ] Set up fail2ban for SSH protection
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Backup database regularly
- [ ] Use strong passwords
- [ ] Enable 2FA where possible

## Performance Optimization

### Backend
- Enable gzip compression
- Use Redis for caching
- Optimize database queries
- Set up CDN for static assets
- Monitor with New Relic/DataDog

### Frontend
- Enable service workers
- Optimize images
- Use lazy loading
- Minimize bundle size
- Enable browser caching

## Backup Strategy

### Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backups/medivars_$DATE"
tar -czf "/backups/medivars_$DATE.tar.gz" "/backups/medivars_$DATE"
rm -rf "/backups/medivars_$DATE"

# Schedule daily backups
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

## Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx/HAProxy)
- Multiple backend instances
- Database clustering/sharding
- CDN for global distribution

### Vertical Scaling
- Increase server resources
- Optimize database performance
- Use caching layers
- Monitor resource usage

## Troubleshooting

### Common Issues
1. **CORS errors** - Check frontend URLs in backend config
2. **Database connection** - Verify MongoDB URI and network access
3. **SSL issues** - Check certificate validity and paths
4. **Memory leaks** - Monitor with PM2 and restart if needed
5. **High CPU usage** - Profile application and optimize queries

### Health Checks
```bash
# API health check
curl https://api.medivars.com/api/health

# Database connection test
curl https://api.medivars.com/api/health/db
```