import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
  } from "firebase/firestore";
  import { db } from "./firebase";
  const listingsRef = collection(db, "listings");

  const saleListingQuery = query(
    listingsRef,
    where("type", "==", "sale"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const rentListingQuery = query(
    listingsRef,
    where("type", "==", "rent"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const offerListingQuery = query(
    listingsRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    limit(4)
  );




  const queries = {
    saleListingQuery,
    rentListingQuery,
    offerListingQuery
    
}

export default queries