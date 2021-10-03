db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "hour",
          },
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
