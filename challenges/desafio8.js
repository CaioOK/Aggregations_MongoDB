db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["380", "747"],
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
      as: "alliance",
    },
  },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  { $unwind: "$_id" },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
