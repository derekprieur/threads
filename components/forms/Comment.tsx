'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { updateUser } from '@/lib/actions/user.actions'
import { commentValidation } from '@/lib/validations/thread'
import { addCommentToThread } from '@/lib/actions/thread.actions'

interface CommentProps {
    threadId: string,
    currentUserImg: string,
    currentUserId: string
}

const Comment = ({ currentUserId, currentUserImg, threadId }: CommentProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex gap-3 w-full items-center'>
                            <FormLabel>
                                <Image src={currentUserImg} alt='profile image' width={48} height={48} className='rounded-full object-cover' />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input type='text' placeholder='Comment...' className='no-focus text-light-1 outline-none' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment