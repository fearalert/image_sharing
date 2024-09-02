
const SkeletonLoader = () => {

    const array = new Array(3).fill(0);

    return (
        <>
            {array.map((_, index) => (
                <div key={index} className="animate-pulse w-full h-fit sm:w-[28rem] relative">
                    <div className="overflow-hidden rounded-t-lg bg-gray-300 h-52"></div>
                    <div className="flex items-center justify-center gap-2 w-full mt-2">
                        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                        <div className="bg-gray-300 h-6 w-3/12 rounded"></div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default SkeletonLoader
