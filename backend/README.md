# Oakyard Backend API

A comprehensive Flask backend for the Oakyard space-sharing platform with integrated virtual meetings. This backend provides RESTful APIs for space management, booking system, user authentication, and real-time virtual meeting capabilities.

## Features

### 🏢 Core Features
- **User Authentication**: JWT-based authentication with email verification
- **Space Management**: CRUD operations for workspaces, meeting rooms, and event spaces
- **Booking System**: Real-time availability checking and booking management
- **Payment Integration**: Stripe integration for payment processing
- **Review System**: User reviews and ratings for spaces
- **Admin Panel**: Complete admin interface for platform management

### 🎥 Virtual Meetings
- **Real-time Video Calls**: WebRTC-based video conferencing
- **Text Chat**: Real-time messaging in meeting rooms
- **Room Management**: Create, join, and manage virtual meeting rooms
- **Participant Management**: Mute/unmute, video controls, and participant status

### 📧 Communication
- **Email Service**: Automated emails for bookings, confirmations, and notifications
- **Push Notifications**: Real-time notifications for users
- **WebSocket Support**: Real-time updates for meetings and bookings

### 🔧 Technical Features
- **Database**: SQLAlchemy ORM with PostgreSQL support
- **Caching**: Redis for session management and caching
- **File Storage**: AWS S3 or local file storage for images
- **Background Jobs**: Celery for asynchronous task processing
- **API Documentation**: Comprehensive API documentation
- **Security**: Rate limiting, input validation, and security best practices

## Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL
- Redis
- Node.js (for frontend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oakyard-gather-hub/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb oakyard_db
   
   # Run migrations
   flask db upgrade
   
   # Seed with sample data
   python app/seed_data.py
   ```

6. **Start Redis**
   ```bash
   redis-server
   ```

7. **Start the application**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

## Environment Configuration

Create a `.env` file with the following variables:

```bash
# Flask Configuration
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=jwt-secret-key-here
FLASK_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost/oakyard_db

# Email Configuration
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=noreply@oakyard.com

# Redis
REDIS_URL=redis://localhost:6379/0

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=us-east-1

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/verify-email/{token}` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload avatar
- `GET /api/users/{id}/spaces` - Get user's spaces
- `GET /api/users/{id}/reviews` - Get user's reviews
- `GET /api/users/dashboard` - Get user dashboard

### Spaces
- `GET /api/spaces` - List spaces (with search/filter)
- `GET /api/spaces/{id}` - Get space details
- `POST /api/spaces` - Create space (owner only)
- `PUT /api/spaces/{id}` - Update space
- `DELETE /api/spaces/{id}` - Delete space
- `POST /api/spaces/{id}/images` - Upload space images
- `GET /api/spaces/{id}/availability` - Check availability
- `GET /api/spaces/{id}/reviews` - Get space reviews
- `POST /api/spaces/{id}/reviews` - Add review

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{id}` - Get booking details
- `PUT /api/bookings/{id}` - Update booking
- `POST /api/bookings/{id}/cancel` - Cancel booking
- `POST /api/bookings/{id}/payment` - Process payment
- `GET /api/bookings/calendar` - Get calendar view

### Virtual Meetings
- `GET /api/rooms` - List meeting rooms
- `POST /api/rooms` - Create meeting room
- `GET /api/rooms/{id}` - Get room details
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room
- `POST /api/rooms/{id}/join` - Join room
- `POST /api/rooms/{id}/leave` - Leave room
- `POST /api/rooms/join-by-code` - Join room by code

### Admin
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Manage users
- `GET /api/admin/spaces` - Manage spaces
- `POST /api/admin/spaces/{id}/approve` - Approve space
- `GET /api/admin/bookings` - View all bookings
- `GET /api/admin/analytics` - Platform analytics

## WebSocket Events

### Meeting Room Events
- `connect` - Connect to meeting room
- `disconnect` - Disconnect from meeting room
- `join_room` - Join a meeting room
- `leave_room` - Leave a meeting room
- `send_message` - Send message to room
- `toggle_mute` - Toggle mute status
- `toggle_video` - Toggle video status

### WebRTC Signaling
- `offer` - Send WebRTC offer
- `answer` - Send WebRTC answer
- `ice_candidate` - Send ICE candidate

## Database Models

### User
- Authentication and profile information
- Roles: user, owner, admin
- Email verification and password reset

### Space
- Workspace details and amenities
- Location and pricing information
- Approval status and ratings

### Booking
- Booking details and status
- Payment information
- Availability checking

### Review
- User reviews and ratings
- Booking relationship

### Room
- Virtual meeting room information
- Participant management
- Room codes and expiration

### Message
- Chat messages in meeting rooms
- Message types and timestamps

## Services

### Email Service
- Welcome emails and verification
- Booking confirmations and reminders
- Password reset emails

### Payment Service
- Stripe integration
- Payment processing and refunds
- Webhook handling

### Image Service
- Image upload and processing
- AWS S3 integration
- Image optimization

### Notification Service
- Push notifications
- Email notifications
- Real-time updates

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- SQL injection prevention
- XSS protection

## Testing

```bash
# Run tests
python -m pytest tests/

# Run with coverage
python -m pytest tests/ --cov=app --cov-report=html
```

## Deployment

### Docker Deployment

```bash
# Build Docker image
docker build -t oakyard-backend .

# Run with Docker Compose
docker-compose up -d
```

### Production Deployment

1. Set up production environment variables
2. Configure PostgreSQL and Redis
3. Set up SSL certificates
4. Configure reverse proxy (Nginx)
5. Set up monitoring and logging
6. Configure backup strategies

### Environment-Specific Configs

- **Development**: Debug mode, local database
- **Testing**: In-memory database, disabled external services
- **Production**: Production database, SSL, monitoring

## API Documentation

The API documentation is available at:
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@oakyard.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## Changelog

### v1.0.0
- Initial release
- Core API functionality
- Virtual meetings integration
- Admin panel
- Payment processing
- Email notifications