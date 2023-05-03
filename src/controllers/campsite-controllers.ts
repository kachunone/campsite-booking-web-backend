import { Request, Response, NextFunction } from "express";
import Campsite from "../models/campsite";
import HttpError from "../models/http-error";
import { Schema, model, Document, Types } from "mongoose";
import { IBooking } from "../models/booking";

const dummyData = [
  {
    title: "Lakeside Retreat",
    description:
      "Enjoy a serene getaway by the lake. This campsite is perfect for those who love the outdoors and want to escape the hustle and bustle of the city. You can fish, swim or just relax by the lake. The site comes equipped with a single tent and is perfect for couples or solo travelers.",
    region: "Downtown Toronto",
    equipment: ["Singe tent"],
    price: 50,
    image: "../assets/campsite-image.jpeg",
  },
  {
    title: "Midtown Oasis",
    description:
      "Escape the hustle and bustle of the city and enjoy some peace and quiet at this Midtown oasis. This campsite is ideal for families or groups of friends who want to spend some quality time together. The site comes equipped with 3 tents and a trailer that can accommodate up to 18ft. You can explore the nearby hiking trails or simply relax by the campfire and roast marshmallows.",
    region: "Midtown Toronto",
    equipment: ["3 tents", "Trailer up to 18ft"],
    price: 100,
    image: "../assets/campsite-image2.jpeg",
  },
  {
    title: "Country Charm",
    description:
      "Experience the beauty of the countryside at this charming campsite. This site is located in the heart of York and is perfect for those who want to escape the city and enjoy some peace and quiet. The site comes equipped with a single tent and 3 tents, making it ideal for families or groups of friends. You can explore the nearby trails or simply relax and take in the stunning views.",
    region: "York",
    equipment: ["Singe tent", "3 tents"],
    price: 75,
    image: "../assets/campsite-image3.jpeg",
  },
];

export default class CampsiteController {
  static async getCampsites(req: Request, res: Response, next: NextFunction) {
    try {
      const campsites = await Campsite.find({});
      res.json(campsites);
    } catch (err) {
      return next(new HttpError("Failed to fetch campsites infomation.", 422));
    }
  }

  static async writeCampsites(req: Request, res: Response, next: NextFunction) {
    console.log("hello");
    try {
      const result = await Campsite.create(dummyData);
      console.log(result);
      res.json("writed successfully");
    } catch (err) {
      console.log(err);
    }
  }
}
