import { Request, Response, NextFunction } from "express";
import Campsite from "../models/campsite";
import HttpError from "../models/http-error";

const dummyData = [
  {
    title: "Lakeside Retreat",
    description:
      "Enjoy a serene getaway by the lake. This campsite is perfect for those who love the outdoors and want to escape the hustle and bustle of the city. You can fish, swim or just relax by the lake. The site comes equipped with a single tent and is perfect for couples or solo travelers.",
    region: "Downtown Toronto",
    equipments: ["Single tent"],
    price: 50,
    image: "campsite-image.jpeg",
  },
  {
    title: "Midtown Oasis",
    description:
      "Escape the hustle and bustle of the city and enjoy some peace and quiet at this Midtown oasis. This campsite is ideal for families or groups of friends who want to spend some quality time together. The site comes equipped with 3 tents and a trailer that can accommodate up to 18ft. You can explore the nearby hiking trails or simply relax by the campfire and roast marshmallows.",
    region: "Midtown Toronto",
    equipments: ["Single tent", "3 tents", "Trailer up to 18ft"],
    price: 100,
    image: "campsite-image2.jpeg",
  },
  {
    title: "Country Charm",
    description:
      "Experience the beauty of the countryside at this charming campsite. This site is located in the heart of York and is perfect for those who want to escape the city and enjoy some peace and quiet. The site comes equipped with a single tent and 3 tents, making it ideal for families or groups of friends. You can explore the nearby trails or simply relax and take in the stunning views.",
    region: "York",
    equipments: ["Single tent", "3 tents"],
    price: 75,
    image: "campsite-image3.jpeg",
  },
  {
    title: "Rustic Retreat",
    description:
      "Immerse yourself in the rustic charm of this secluded retreat. This campsite is nestled in the woods and offers a peaceful escape from the city. You can enjoy hiking trails, wildlife spotting, and stargazing at night. The site comes equipped with a single tent and camping chairs for your comfort. It's an ideal spot for nature enthusiasts and those seeking a tranquil camping experience.",
    region: "East York",
    equipments: ["Single tent"],
    price: 60,
    image: "campsite-image4.jpeg",
  },
  {
    title: "Coastal Paradise",
    description:
      "Discover the beauty of the coast at this picturesque campsite. Located near the shoreline, you can enjoy stunning ocean views and refreshing sea breezes. The site comes equipped with a single tent and a portable BBQ grill for beachside cookouts. You can swim, sunbathe, or take long walks along the beach. It's the perfect destination for beach lovers and those seeking a coastal retreat.",
    region: "Etobicoke",
    equipments: ["Single tent", "3 tents", "Fire pit"],
    price: 65,
    image: "campsite-image5.jpeg",
  },
  {
    title: "Riverside Haven",
    description:
      "Experience the tranquility of this riverside campsite. Located by a picturesque river, you can enjoy fishing, kayaking, and nature walks. The site comes equipped with a single tent and a fire pit for cozy campfire evenings. It's an ideal spot for nature lovers and those seeking a peaceful camping experience.",
    region: "North York",
    equipments: ["Single tent", "Camping gear"],
    price: 70,
    image: "campsite-image6.jpeg",
  },
  {
    title: "Mountain Escape",
    description:
      "Embark on an adventurous mountain escape at this campsite nestled in the scenic mountains. You can hike challenging trails, witness breathtaking vistas, and spot wildlife. The site comes equipped with 3 tents and camping gear. It's perfect for outdoor enthusiasts and those seeking an adrenaline-filled camping experience.",
    region: "Scarborough",
    equipments: ["Single tent", "3 tents", "Trailer up to 18ft"],
    price: 90,
    image: "campsite-image7.jpeg",
  },
  {
    title: "Secluded Wilderness",
    description:
      "Immerse yourself in the beauty of nature at this secluded wilderness campsite. Surrounded by lush forests and peaceful ambiance, you can unwind and reconnect with nature. The site comes equipped with a single tent and a hammock for ultimate relaxation. It's an ideal retreat for solo travelers or couples seeking solitude.",
    region: "East York",
    equipments: ["Single tent", "3 tents", "Portable grill"],
    price: 55,
    image: "campsite-image8.jpeg",
  },
  {
    title: "Forest Hideaway",
    description:
      "Discover the magic of the forest at this hidden campsite. Surrounded by towering trees and enchanting trails, you can immerse yourself in nature's embrace. The site comes equipped with 3 tents and camping gear, making it ideal for a group adventure. Get ready to create unforgettable memories in the heart of nature.",
    region: "North York",
    equipments: ["3 tents", "Camping gear"],
    price: 110,
    image: "campsite-image9.jpeg",
  },
  {
    title: "Sunset Beach Camp",
    description:
      "Experience the beauty of a beachside campsite with stunning sunset views. This campsite is located near the shoreline, allowing you to enjoy the sand, surf, and sun. The site comes equipped with a single tent and beach chairs for ultimate relaxation. It's the perfect spot for beach lovers and those seeking a coastal camping adventure.",
    region: "Scarborough",
    equipments: ["Single tent", "Beach chairs"],
    price: 75,
    image: "campsite-image10.jpeg",
  },
  {
    title: "Woodland Paradise",
    description:
      "Indulge in the tranquility of this woodland paradise. Nestled amidst lush greenery, this campsite offers a peaceful retreat in nature's embrace. The site comes equipped with a single tent and a hammock for ultimate relaxation. Spend your days exploring the forest trails and your nights gazing at the star-filled sky.",
    region: "East York",
    equipments: ["Single tent", "Hammock"],
    price: 65,
    image: "campsite-image11.jpeg",
  },
  {
    title: "Tranquil Meadows",
    description:
      "Immerse yourself in the beauty of tranquil meadows at this serene campsite. Surrounded by lush green fields and colorful wildflowers, you can experience a peaceful retreat in nature. The site comes equipped with a single tent and camping chairs for relaxation. It's an ideal spot for nature lovers and those seeking a calming camping experience.",
    region: "York",
    equipments: ["Single tent", "Camping chairs"],
    price: 70,
    image: "campsite-image12.jpeg",
  },
];

export default class CampsiteController {
  static async getCampsites(req: Request, res: Response, next: NextFunction) {
    try {
      const campsites = await Campsite.find({}).populate({
        path: "bookings",
        select: { start: true, end: true },
      });
      res.json(campsites);
    } catch (err) {
      return next(new HttpError("Failed to fetch campsites infomation.", 422));
    }
  }

  static async writeCampsites(req: Request, res: Response, next: NextFunction) {
    console.log("Hello");
    try {
      const result = await Campsite.create(dummyData);
      console.log(result);
      res.json("writed successfully");
    } catch (err) {
      console.log(err);
    }
  }
}
