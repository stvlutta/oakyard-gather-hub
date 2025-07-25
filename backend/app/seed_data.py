from app import create_app, db
from app.models.user import User
from app.models.space import Space
from app.models.booking import Booking
from app.models.review import Review
from app.models.room import Room, RoomParticipant
from app.models.message import Message
from datetime import datetime, timedelta
import random

def create_sample_users():
    """Create sample users"""
    users = []
    
    # Admin user
    admin = User(
        email='admin@oakyard.com',
        name='Admin User',
        role='admin',
        email_verified=True,
        is_active=True
    )
    admin.set_password('admin123')
    users.append(admin)
    
    # Regular users
    user_data = [
        {'email': 'john.doe@example.com', 'name': 'John Doe', 'role': 'user'},
        {'email': 'jane.smith@example.com', 'name': 'Jane Smith', 'role': 'user'},
        {'email': 'mike.johnson@example.com', 'name': 'Mike Johnson', 'role': 'user'},
        {'email': 'sarah.wilson@example.com', 'name': 'Sarah Wilson', 'role': 'user'},
        {'email': 'david.brown@example.com', 'name': 'David Brown', 'role': 'user'},
    ]
    
    for user_info in user_data:
        user = User(
            email=user_info['email'],
            name=user_info['name'],
            role=user_info['role'],
            email_verified=True,
            is_active=True,
            phone=f'+1-555-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
            address=f'{random.randint(100, 999)} Main St, City, State {random.randint(10000, 99999)}',
            bio=f'I am {user_info["name"]} and I love using shared spaces for my work.'
        )
        user.set_password('password123')
        users.append(user)
    
    # Space owners
    owner_data = [
        {'email': 'alice.owner@example.com', 'name': 'Alice Owner', 'role': 'owner'},
        {'email': 'bob.owner@example.com', 'name': 'Bob Owner', 'role': 'owner'},
        {'email': 'carol.owner@example.com', 'name': 'Carol Owner', 'role': 'owner'},
        {'email': 'daniel.owner@example.com', 'name': 'Daniel Owner', 'role': 'owner'},
    ]
    
    for owner_info in owner_data:
        owner = User(
            email=owner_info['email'],
            name=owner_info['name'],
            role=owner_info['role'],
            email_verified=True,
            is_active=True,
            phone=f'+1-555-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
            address=f'{random.randint(100, 999)} Business Ave, City, State {random.randint(10000, 99999)}',
            bio=f'I am {owner_info["name"]} and I provide amazing spaces for rent.'
        )
        owner.set_password('password123')
        users.append(owner)
    
    return users

def create_sample_spaces(users):
    """Create sample spaces"""
    spaces = []
    
    # Get owners
    owners = [user for user in users if user.role == 'owner']
    
    space_data = [
        {
            'title': 'Downtown Meeting Room',
            'description': 'Modern meeting room in the heart of downtown with all amenities including projector, whiteboard, and high-speed internet.',
            'category': 'meeting_room',
            'hourly_rate': 50.00,
            'capacity': 8,
            'address': '123 Business District, Downtown, City 12345',
            'amenities': ['wifi', 'projector', 'whiteboard', 'coffee', 'parking'],
            'latitude': 40.7128,
            'longitude': -74.0060,
            'is_featured': True
        },
        {
            'title': 'Creative Studio Space',
            'description': 'Bright and spacious creative studio perfect for workshops, photo shoots, and creative sessions.',
            'category': 'creative_studio',
            'hourly_rate': 75.00,
            'capacity': 12,
            'address': '456 Art District, Creative Quarter, City 12346',
            'amenities': ['wifi', 'natural_light', 'sound_system', 'kitchen', 'parking'],
            'latitude': 40.7589,
            'longitude': -73.9851,
            'is_featured': True
        },
        {
            'title': 'Executive Conference Room',
            'description': 'Premium conference room with video conferencing capabilities and executive amenities.',
            'category': 'conference_room',
            'hourly_rate': 100.00,
            'capacity': 15,
            'address': '789 Corporate Center, Business District, City 12347',
            'amenities': ['wifi', 'video_conferencing', 'projector', 'whiteboard', 'catering', 'parking'],
            'latitude': 40.7505,
            'longitude': -73.9934
        },
        {
            'title': 'Event Hall',
            'description': 'Large event hall suitable for conferences, workshops, and corporate events.',
            'category': 'event_hall',
            'hourly_rate': 200.00,
            'capacity': 100,
            'address': '321 Event Plaza, Convention Center, City 12348',
            'amenities': ['wifi', 'sound_system', 'projector', 'stage', 'catering', 'parking'],
            'latitude': 40.7282,
            'longitude': -74.0776
        },
        {
            'title': 'Coworking Space',
            'description': 'Open coworking space with flexible seating and collaborative environment.',
            'category': 'coworking_space',
            'hourly_rate': 25.00,
            'capacity': 20,
            'address': '654 Startup Hub, Tech District, City 12349',
            'amenities': ['wifi', 'coffee', 'kitchen', 'phone_booth', 'parking'],
            'latitude': 40.7614,
            'longitude': -73.9776
        },
        {
            'title': 'Training Room',
            'description': 'Professional training room with modern equipment and comfortable seating.',
            'category': 'training_room',
            'hourly_rate': 60.00,
            'capacity': 25,
            'address': '987 Education Center, Learning District, City 12350',
            'amenities': ['wifi', 'projector', 'whiteboard', 'flipchart', 'coffee', 'parking'],
            'latitude': 40.7349,
            'longitude': -74.0721
        },
        {
            'title': 'Studio Space',
            'description': 'Versatile studio space for music recording, podcasting, and multimedia production.',
            'category': 'studio_space',
            'hourly_rate': 80.00,
            'capacity': 6,
            'address': '147 Media Row, Entertainment District, City 12351',
            'amenities': ['wifi', 'sound_equipment', 'recording_booth', 'instruments', 'parking'],
            'latitude': 40.7506,
            'longitude': -73.9857
        },
        {
            'title': 'Workshop Space',
            'description': 'Hands-on workshop space with tools and equipment for creative projects.',
            'category': 'workshop_space',
            'hourly_rate': 45.00,
            'capacity': 10,
            'address': '258 Maker Street, Innovation Quarter, City 12352',
            'amenities': ['wifi', 'tools', 'workbenches', 'storage', 'parking'],
            'latitude': 40.7831,
            'longitude': -73.9712
        }
    ]
    
    for i, space_info in enumerate(space_data):
        owner = owners[i % len(owners)]
        space = Space(
            owner_id=owner.id,
            title=space_info['title'],
            description=space_info['description'],
            category=space_info['category'],
            hourly_rate=space_info['hourly_rate'],
            capacity=space_info['capacity'],
            address=space_info['address'],
            amenities=space_info['amenities'],
            latitude=space_info['latitude'],
            longitude=space_info['longitude'],
            is_approved=True,
            is_active=True,
            is_featured=space_info.get('is_featured', False),
            rating_avg=round(random.uniform(4.0, 5.0), 1),
            rating_count=random.randint(5, 50)
        )
        spaces.append(space)
    
    return spaces

def create_sample_bookings(users, spaces):
    """Create sample bookings"""
    bookings = []
    
    # Get regular users
    regular_users = [user for user in users if user.role == 'user']
    
    # Create bookings for the past, present, and future
    for _ in range(30):
        user = random.choice(regular_users)
        space = random.choice(spaces)
        
        # Random date within last 30 days or next 30 days
        days_offset = random.randint(-30, 30)
        base_date = datetime.utcnow() + timedelta(days=days_offset)
        
        # Random start time (9 AM to 6 PM)
        start_hour = random.randint(9, 18)
        start_time = base_date.replace(hour=start_hour, minute=0, second=0, microsecond=0)
        
        # Random duration (1-8 hours)
        duration = random.randint(1, 8)
        end_time = start_time + timedelta(hours=duration)
        
        # Check if space is available
        if space.is_available(start_time, end_time):
            total_amount = space.hourly_rate * duration
            
            # Random status based on date
            if days_offset < -1:
                status = 'completed'
                payment_status = 'paid'
            elif days_offset < 0:
                status = random.choice(['completed', 'confirmed'])
                payment_status = 'paid'
            elif days_offset == 0:
                status = 'confirmed'
                payment_status = 'paid'
            else:
                status = random.choice(['confirmed', 'pending'])
                payment_status = 'paid' if status == 'confirmed' else 'unpaid'
            
            booking = Booking(
                user_id=user.id,
                space_id=space.id,
                start_time=start_time,
                end_time=end_time,
                total_amount=total_amount,
                status=status,
                payment_status=payment_status,
                special_requests=random.choice([
                    '', 'Please prepare coffee for the meeting',
                    'Need extra chairs for 2 people',
                    'Vegetarian catering preferred',
                    'Early access required'
                ])
            )
            bookings.append(booking)
    
    return bookings

def create_sample_reviews(users, spaces, bookings):
    """Create sample reviews"""
    reviews = []
    
    # Get completed bookings
    completed_bookings = [b for b in bookings if b.status == 'completed']
    
    # Create reviews for random completed bookings
    for booking in random.sample(completed_bookings, min(20, len(completed_bookings))):
        review = Review(
            user_id=booking.user_id,
            space_id=booking.space_id,
            booking_id=booking.id,
            rating=random.randint(3, 5),
            comment=random.choice([
                'Great space with excellent amenities!',
                'Perfect for our team meeting. Clean and well-equipped.',
                'Love the location and the professional atmosphere.',
                'Good value for money. Would book again.',
                'Excellent service and beautiful space.',
                'Very convenient location with good parking.',
                'Modern facilities and responsive host.',
                'Spacious and comfortable environment.',
                'Highly recommend for business meetings.',
                'Professional setup with all necessary equipment.'
            ])
        )
        reviews.append(review)
    
    return reviews

def create_sample_rooms(users):
    """Create sample meeting rooms"""
    rooms = []
    
    # Get users who can host
    hosts = [user for user in users if user.role in ['user', 'owner']]
    
    room_data = [
        {
            'name': 'Daily Standup',
            'description': 'Daily team standup meeting',
            'max_participants': 10,
            'is_private': False
        },
        {
            'name': 'Project Planning',
            'description': 'Planning session for new project',
            'max_participants': 8,
            'is_private': True,
            'password': 'plan123'
        },
        {
            'name': 'Client Presentation',
            'description': 'Presentation to potential clients',
            'max_participants': 15,
            'is_private': True,
            'password': 'client456'
        },
        {
            'name': 'Team Social',
            'description': 'Virtual team social event',
            'max_participants': 20,
            'is_private': False
        },
        {
            'name': 'Training Session',
            'description': 'Employee training and development',
            'max_participants': 25,
            'is_private': False
        }
    ]
    
    for room_info in room_data:
        host = random.choice(hosts)
        
        # Random expiration (some expired, some active)
        if random.random() < 0.3:  # 30% expired
            expires_at = datetime.utcnow() - timedelta(hours=random.randint(1, 24))
        else:
            expires_at = datetime.utcnow() + timedelta(hours=random.randint(1, 48))
        
        room = Room(
            name=room_info['name'],
            description=room_info['description'],
            host_id=host.id,
            max_participants=room_info['max_participants'],
            is_private=room_info['is_private'],
            password=room_info.get('password'),
            expires_at=expires_at
        )
        rooms.append(room)
    
    return rooms

def create_sample_messages(users, rooms):
    """Create sample messages"""
    messages = []
    
    # Sample messages
    sample_messages = [
        'Hello everyone!',
        'Great to see you all here.',
        'Let\'s start with the agenda.',
        'I agree with that point.',
        'Can you share your screen?',
        'Thanks for joining today.',
        'Let\'s schedule a follow-up.',
        'Good point!',
        'I have a question about this.',
        'Perfect, let\'s move forward.',
        'See you all next week!',
        'Thanks for the productive meeting.'
    ]
    
    # Get active rooms
    active_rooms = [room for room in rooms if not room.is_expired()]
    
    for room in active_rooms:
        # Create some participants
        participants = random.sample(users, min(random.randint(2, 5), len(users)))
        
        for participant in participants:
            room.add_participant(participant.id)
        
        # Create messages
        for _ in range(random.randint(3, 10)):
            user = random.choice(participants)
            message = Message(
                room_id=room.id,
                user_id=user.id,
                message=random.choice(sample_messages),
                message_type='text',
                created_at=datetime.utcnow() - timedelta(minutes=random.randint(1, 60))
            )
            messages.append(message)
    
    return messages

def seed_database():
    """Seed the database with sample data"""
    print("Creating sample data...")
    
    # Create users
    users = create_sample_users()
    for user in users:
        db.session.add(user)
    db.session.commit()
    print(f"Created {len(users)} users")
    
    # Create spaces
    spaces = create_sample_spaces(users)
    for space in spaces:
        db.session.add(space)
    db.session.commit()
    print(f"Created {len(spaces)} spaces")
    
    # Create bookings
    bookings = create_sample_bookings(users, spaces)
    for booking in bookings:
        db.session.add(booking)
    db.session.commit()
    print(f"Created {len(bookings)} bookings")
    
    # Create reviews
    reviews = create_sample_reviews(users, spaces, bookings)
    for review in reviews:
        db.session.add(review)
    db.session.commit()
    print(f"Created {len(reviews)} reviews")
    
    # Update space ratings
    for space in spaces:
        space.update_rating()
    db.session.commit()
    print("Updated space ratings")
    
    # Create meeting rooms
    rooms = create_sample_rooms(users)
    for room in rooms:
        db.session.add(room)
    db.session.commit()
    print(f"Created {len(rooms)} meeting rooms")
    
    # Create messages
    messages = create_sample_messages(users, rooms)
    for message in messages:
        db.session.add(message)
    db.session.commit()
    print(f"Created {len(messages)} messages")
    
    print("Sample data created successfully!")

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Drop and recreate tables
        db.drop_all()
        db.create_all()
        
        # Seed database
        seed_database()