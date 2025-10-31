# Use Nginx Alpine as base image for lightweight static file serving
FROM nginx:alpine

# Copy static files to Nginx html directory
COPY . /usr/share/nginx/html

# Copy custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
