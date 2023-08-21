import { currentUser } from "@clerk/nextjs";

import { fetchCommunities } from "@/lib/actions/community.actions"
import { fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard"

const RightSidebar = async () => {
    const user = await currentUser();

    if (!user) return null;

    const suggestedCommunities = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })

    const similarMinds = await fetchUsers({
        userId: user.id,
        pageSize: 4,
    });

    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
                <div className='mt-7 flex w-[350px] flex-col gap-9'>
                    {suggestedCommunities.communities.length === 0 ? (
                        <p className="no-result">No communities yet</p>
                    ) : (
                        <>
                            {suggestedCommunities.communities.map((community) => (
                                <UserCard id={community.id} imgUrl={community.image} name={community.name} username={community.username} />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
                <div className='mt-7 flex w-[350px] flex-col gap-10'>
                    {similarMinds.users.length > 0 ? (
                        <>
                            {similarMinds.users.map((person) => (
                                <UserCard
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                    personType='User'
                                />
                            ))}
                        </>
                    ) : (
                        <p className='!text-base-regular text-light-3'>No users yet</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default RightSidebar