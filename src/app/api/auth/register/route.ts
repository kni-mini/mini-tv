import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser } from '@/lib/users/actions';
import { checkPasswordStrength } from '@/lib/validators/password-strength';

// POST /api/auth/register
export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword } = await request.json();

    // Validate password
    const passwordValidation = checkPasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json({ error: passwordValidation.error }, { status: 400 });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await createUser({
      email,
      password: hashedPassword,
      createdAt: new Date(),
      deletedAt: null,
    });

    console.log('User created successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
