let db = { rider: [], driver: [] };

let distanceThreshold = 20;

const registerRider = (name, coordinates) => {
	db.rider.push({ name, coordinates, driver: [] });
};

const registerDriver = (name, coordinates, availability) => {
	let driverUpdaed = false;

	db.driver = db.driver.map((driver_item) => {
		if (driver_item.name === name) {
			driverUpdaed = true;
			driver_item.availability = availability;
			driver_item.coordinates = coordinates;
		}
		return driver_item;
	});

	if (!driverUpdaed) {
		db.driver.push({ name, coordinates, availability });
	}
};

const startTrip = (rider_item) => {
	let driverDistances = [];

	const {
		coordinates: { x: x2, y: y2 },
	} = rider_item;

	db.driver.forEach((driver_item) => {
		const {
			coordinates: { x: x1, y: y1 },
		} = driver_item;

		let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

		// console.log(driver_item.availability);

		if (driver_item.availability === "on") {
			driverDistances.push({ driver: driver_item, distance: distance });
		}
	});

	let nearestDriver = 0;

	let assignedDriver = {};

	driverDistances.forEach((dDistance) => {
		// console.log(nearestDriver < dDistance.distance);
		if (nearestDriver < dDistance.distance) {
			assignedDriver = dDistance;
		}
	});

	if (assignedDriver.distance > distanceThreshold) {
		return "Booking Not Available";
	}

	if (assignedDriver.driver) {
		return "Cab Booked " + assignedDriver.driver.name;
	}

	return "Booking Not Available";
};

registerRider("Test Rider", { x: 10, y: 20 });

registerDriver("Test Driver", { x: 20, y: 30 }, "on");
registerDriver("Test Driver2", { x: 15, y: 30 }, "off");

console.log(startTrip(db.rider[0]));

registerDriver("Test Driver2", { x: 15, y: 30 }, "on");

console.log(startTrip(db.rider[0]));
