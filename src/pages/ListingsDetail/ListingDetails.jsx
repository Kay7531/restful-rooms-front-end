import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NewReview from "../../components/NewReview/NewReview";
import styles from './ListingDetails.module.css'

//Services
import * as listingService from "../../services/listingService";

const ListingDetails = (props) => {
    const { id } = useParams()
    const [listing, setListing] = useState(null)
    useEffect(() => {
        const fetchListing = async () => {
            const data = await listingService.show(id)
            setListing(data)
        }
        fetchListing()
    }, [id])

    const handleAddReview = async (reviewData) => {
        const newReview = await listingService.createReview(id, reviewData)
        setListing({ ...listing, reviews: [...listing.reviews, newReview] })
    }

    const handleAddActivity = async (activityData) => {
        const newActivity = await listingService.createActivity(id, activityData)
        setListing({ ...listing, activities: [...listing.activities, newActivity] })
    }

    console.log('Listing data', listing)
    if (!listing) return <h1>Loading</h1>
    return (
        <>
            <main >

                <h1>{listing.title}</h1>
                {listing.photo}
                <p>{listing.bedrooms} {listing.beds} {listing.baths}{listing.guests}</p>
                <p>{listing.description}</p>

                <span>
            {/* <AuthorInfo content={listing} /> */}

            {listing.author._id === props.user.profile &&
              <>
                <Link to={`/listings/${id}/edit`} state={listing}>Edit</Link>
                <button>Delete</button>
              </>
            }

          </span>
                


            </main>

            <section>
                <h1>Review</h1>
                <NewReview handleAddReview={handleAddReview} />
            </section>
        </>
    )
}

export default ListingDetails