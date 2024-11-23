import PropertyCard from '@/components/property/property-card';
import Property from '@/models/Property';
import connectDB from '@/config/database';

const PropertyPage = async () => {
    await connectDB();
    const properties = await Property.find({}).lean();

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
                </div>
            </section>
        </>
    );
}

export default PropertyPage;