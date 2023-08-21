import * as z from 'zod';

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, {message: 'Name must contain at least 3 characters'}).max(30),
    username: z.string().min(3, {message: 'Username must contain at least 3 characters'}).max(30),
    bio: z.string().min(3, {message: 'Bio must contain at least 3 characters'}).max(1000),
});