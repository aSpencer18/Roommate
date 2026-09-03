import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    occupancy: searchParams.get("occupancy") || "",
    genderPreference: searchParams.get("genderPreference") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="single_room">Single Room</option>
            <option value="shared_room">Shared Room</option>
            <option value="pg">PG</option>
            <option value="flat">Flat</option>
            <option value="hostel">Hostel</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="occupancy">Sharing</label>
          <select
            name="occupancy"
            id="occupancy"
            onChange={handleChange}
            defaultValue={query.occupancy}
          >
            <option value="">any</option>
            <option value="single">Single</option>
            <option value="double">Double Sharing</option>
            <option value="triple">Triple Sharing</option>
            <option value="dorm">Dorm</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="genderPreference">Gender</label>
          <select
            name="genderPreference"
            id="genderPreference"
            onChange={handleChange}
            defaultValue={query.genderPreference}
          >
            <option value="">any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="co_ed">Co-ed</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
