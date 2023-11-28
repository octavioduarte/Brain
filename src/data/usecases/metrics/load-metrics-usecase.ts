import { LoadMetrics } from "@/domain/usecases/metrics";
import { LoadMetricsRepository } from "@/data/protocols";

export class LoadMetricsUseCase implements LoadMetrics {
  constructor(private readonly metricsRepository: LoadMetricsRepository) {}

  async loadMetrics(): Promise<LoadMetrics.Result> {
    const metrics: LoadMetricsRepository.Result[] =
      await this.metricsRepository.loadMetrics();
    return {
      farms_total: metrics.length,
      farms_total_area_in_hct: this.handleCalcTotalAreaFarms(metrics),
      farms_total_arable_area_in_hct: this.handleCalcTotalAreaFarms(metrics, 'arable_area'),
      farms_total_vegetation_area_in_hct: this.handleCalcTotalAreaFarms(metrics, 'vegetation_area'),
      farms_total_by_state: this.handleCalcByState(metrics),
      total_by_culture: this.handleCalcByCulture(metrics),
    };
  }

  private handleCalcTotalAreaFarms(
    metrics: LoadMetricsRepository.Result[],
    customKeyCalc?: 'arable_area' | 'vegetation_area'
  ): number {
    return metrics.reduce(
      (accumulated, current) => accumulated + current[customKeyCalc ? customKeyCalc : 'area'],
      0
    );
  }

  private handleCalcByState(metrics: LoadMetricsRepository.Result[]): LoadMetrics.FarmsTotalByState {
    let metricsState: LoadMetrics.FarmsTotalByState = {}
    metrics.forEach((metric) => {
      if (!Object.keys(metricsState).includes(metric.state_uf)) {

        const dataByState = metrics.filter((metricsByState) => metricsByState.state_uf === metric.state_uf) 

        metricsState = {
          ...metricsState,
          [metric.state_uf.toLowerCase()]: {
            farms_total: dataByState.length,
            farms_total_area_in_hct: this.handleCalcTotalAreaFarms(dataByState),
          }
        };
      }
    });
    return metricsState;
  }

  private handleCalcByCulture(metrics: LoadMetricsRepository.Result[]): LoadMetrics.TotalByCulture {
    let metricsCulture: LoadMetrics.TotalByCulture = {}
    const dataByCultureList: {area: number; culture: string}[] = []
    metrics.forEach(metric => {
      metric.culture.forEach(metricCulture => {
          dataByCultureList.push({
            area: metricCulture.area,
            culture: metricCulture.culture.description
          })
      })  
    })

    dataByCultureList.forEach((dataByCulture) => {
      if (!Object.keys(metricsCulture).includes(dataByCulture.culture)) {
        const listFiltered = dataByCultureList.filter(item => item.culture === dataByCulture.culture)
        metricsCulture = {
          ...metricsCulture,
          [dataByCulture.culture.toLowerCase()]: {
            total_occupation_in_hct: this.handleCalcTotalAreaFarms(listFiltered as unknown as LoadMetricsRepository.Result[]),
          }
        }
      }
    })
    return metricsCulture
  }
}