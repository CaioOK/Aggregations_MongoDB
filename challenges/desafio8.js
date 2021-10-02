db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $regex: /380|747/,
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$$airline", "$airlines"],
            },
          },
        },
      ],
      as: "xablau",
    },
  },
  {
    $group: {
      _id: "$xablau.name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  { $unwind: "$_id" },
]);
