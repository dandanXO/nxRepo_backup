import {DistributeCollectByStageResponse, Stage} from "../../types";

export const normalizeCollector = (data: DistributeCollectByStageResponse[], restrictedStages: Stage[]) => {
    if(!data) return [];
    const allStageKey = [];
    const allMerchantKey = [];
    const allTeamKey = [];
    const allCollectors = [];
      const newData = data
          .filter((stage) => restrictedStages.indexOf(stage.stage) === -1)
          .map((stage, stageIndex) => {
              const newMerchants = stage.merchants.map((merchant, merchantIndex) => {
                  const newTeams = merchant.teams.map((team, teamIndex) => {
                      const newCollectors = team.collectors.map((collector) => {
                          const collectorKey = collector.collectorId;
                          allCollectors.push(collectorKey);
                          return {
                              key: collectorKey,
                              title: collector.collectorName,
                              collectorId: collector.collectorId,
                          }
                      })
                      const teamKey = `${stageIndex}:${merchantIndex}::${teamIndex}:${team.team}`;
                      allTeamKey.push(teamKey);
                      return {
                          key: teamKey,
                          title: team.team === null ? "催收團隊-未分類" : "催收團隊-" + team.team,
                          level: "team",
                          checkboxData: newCollectors,
                      }
                  })
                  const merchantKey = `${stageIndex}:${merchantIndex}:${merchant.merchantId}`;
                  allMerchantKey.push(merchantKey);
                  return {
                      key: merchantKey,
                      title: "商戶-" + merchant.merchant,
                      level: "merchant",
                      children: newTeams,
                  }
              })
              const stageKey = `${stageIndex}:${stage.stage}`;
              allStageKey.push(stageKey);
              return {
                  key: stageKey,
                  title: "催收階段 " + stage.stage,
                  level: "stage",
                  children: newMerchants,
              }
          })
    newData["allKey"] = allStageKey.concat(allMerchantKey).concat(allTeamKey);
    newData["allCollectorKey"] = allCollectors;
  return newData;
}
