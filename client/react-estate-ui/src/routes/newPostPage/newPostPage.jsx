import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import apiRequest  from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import {useNavigate} from "react-router-dom";

function NewPostPage() {
  const [value,setValue] = useState("");
  const [images,setImages] = useState([]);
  const [error,setError] = useState("");
  const [amenities, setAmenities] = useState([]);

  const AMENITY_OPTIONS = [
    "wifi",
    "ac",
    "geyser",
    "laundry",
    "parking",
    "power_backup",
    "attached_bathroom",
    "cupboard",
  ];

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try{
    const res = await apiRequest.post("/posts",{
       postData:{
         title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
          amenities: amenities
       },
       postDetail:{
        desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
          occupancy: inputs.occupancy,
          genderPreference: inputs.genderPreference,
          foodIncluded: inputs.foodIncluded === "true",
          furnishing: inputs.furnishing,
          noticePeriod: inputs.noticePeriod,
          depositAmount: parseInt(inputs.depositAmount) || undefined,
          availableFrom: inputs.availableFrom
            ? new Date(inputs.availableFrom)
            : undefined,
          college: parseInt(inputs.college) || undefined,
          office: parseInt(inputs.office) || undefined,
          metro: parseInt(inputs.metro) || undefined,
          market: parseInt(inputs.market) || undefined,
       },
    });
    navigate("/"+res.data.id)
    }catch(err){
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
               <ReactQuill theme="snow" onChange={setValue} value={value}/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" id="property">
                <option value="single_room">Single Room</option>
                <option value="shared_room">Shared Room</option>
                <option value="pg">PG</option>
                <option value="flat">Flat</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="genderPreference">Gender Preference</label>
              <select name="genderPreference" id="genderPreference">
                <option value="co_ed">Co-ed</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="foodIncluded">Food Included</label>
              <select name="foodIncluded" id="foodIncluded">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="furnishing">Furnishing</label>
              <select name="furnishing" id="furnishing">
                <option value="furnished">Furnished</option>
                <option value="semi_furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="noticePeriod">Notice Period</label>
              <input
                id="noticePeriod"
                name="noticePeriod"
                type="text"
                placeholder="e.g. 1 month"
              />
            </div>
            <div className="item">
              <label htmlFor="depositAmount">Deposit Amount</label>
              <input
                min={0}
                id="depositAmount"
                name="depositAmount"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="availableFrom">Available From</label>
              <input id="availableFrom" name="availableFrom" type="date" />
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
        <div className="item">
              <label htmlFor="college">College/Office Hub</label>
              <input min={0} id="college" name="college" type="number" />
            </div>
            <div className="item">
              <label htmlFor="office">Office</label>
              <input min={0} id="office" name="office" type="number" />
            </div>
            <div className="item">
              <label htmlFor="metro">Metro/Bus Stop</label>
              <input min={0} id="metro" name="metro" type="number" />
            </div>
            <div className="item">
              <label htmlFor="market">Market</label>
              <input min={0} id="market" name="market" type="number" />
            </div>
            <div className="item amenities">
              <label>Amenities</label>
              <div className="amenityList">
                {AMENITY_OPTIONS.map((amenity) => (
                  <label key={amenity} className="amenityOption">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    {amenity.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
          </div>
          </div>
      <div className="sideContainer">
         {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget uwConfig={{
          multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
        }}
        setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
