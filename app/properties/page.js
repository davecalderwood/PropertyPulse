import PropertyCard from '@/components/property/property-card';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import Pagination from '@/components/property/pagination';

const PropertyPage = async ({ searchParams: { page = 1, pageSize = 4 } }) => {
    await connectDB();
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    return (
        <>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    {properties.length === 0 ? (<p>No Properties Found</p>) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {
                                properties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))
                            }
                        </div>
                    )}

                    <Pagination
                        page={parseInt(page)}
                        pageSize={parseInt(pageSize)}
                        totalItems={total}
                    />
                </div>
            </section>
        </>
    );
}

export default PropertyPage;