db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lte: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracao: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "minute",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracao",
      },
    },
  },
]);
