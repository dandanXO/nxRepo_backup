import {DistributeCollectByStageResponse, Stage} from "../../types";

export const normalizeCollector = (data: DistributeCollectByStageResponse[], restrictedStages: Stage[]) => {
    if(!data) return [];
      const newData = data
          .filter((stage) => restrictedStages.indexOf(stage.stage) === -1)
          .map((stage, stageIndex) => {
              const newMerchants = stage.merchants.map((merchant, merchantIndex) => {
                  const newTeams = merchant.teams.map((team, teamIndex) => {
                      const newCollectors = team.collectors.map((collector) => {
                          return {
                              key: collector.collectorId,
                              title: collector.collectorName,
                              collectorId: collector.collectorId,
                          }
                      })
                      return {
                          key: `${stageIndex}:${merchantIndex}::${teamIndex}:${team.team}`,
                          title: team.team === null ? "催收團隊-未分類" : "催收團隊-" + team.team,
                          level: "team",
                          checkboxData: newCollectors,
                      }
                  })
                  return {
                      key: `${stageIndex}:${merchantIndex}:${merchant.merchantId}`,
                      title: "商戶-" + merchant.merchant,
                      level: "merchant",
                      children: newTeams,
                  }
              })
              return {
                  key: `${stageIndex}:${stage.stage}`,
                  title: "催收階段 " + stage.stage,
                  level: "stage",
                  children: newMerchants
              }
          })
  return newData;
}
