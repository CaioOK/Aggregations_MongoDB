db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: {
        $avg: {
          $divide: [
            {
              $dateDiff: {
                startDate: "$startTime",
                endDate: "$stopTime",
                unit: "millisecond",
              },
            },
            1000 * 60 * 60,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracao", 2],
      },
    },
  },
]);
