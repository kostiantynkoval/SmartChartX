import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import {connect} from 'react-redux'
import {getSkills} from '../store/actions/index'
import jwt_decode from 'jwt-decode'
import {RadarChart} from 'react-native-charts-wrapper'
import {withHeader} from '../hoc/withHeader'

const data = {
  legend: {
    enabled: true,
    textSize: 14,
    form: 'CIRCLE',
    position: 'BELOW_CHART_LEFT',
    wordWrapEnabled: true
  },
  yAxis: {
    drawLabels:false,
    drawGridLines: false,
    textColor: processColor('red'),
    axisMinimum: 0,
    axisMaximum: 10,
    labelCount: 6,
    labelCountForce: true,
    granularity: 2,
    granularityEnabled: true,
    style: {
      color: processColor('red')
    }
  }
}

const colors = [ 'rgba(0,100,0,0.8)', 'rgba(139,0,0,0.8)' ]

const keys = [ 'mark', 'disposition' ]

class SkillsScreen extends React.Component {

  state = {
    data: {
      dataSets: [],
    },
    xAxis: {
      valueFormatter: []
    }
  }

  componentDidMount() {
    this.parsedUser = jwt_decode(this.props.token)
    console.log('parsedUser', this.parsedUser);
    this.props.getSkills(this.parsedUser.id)
  }

  static getDerivedStateFromProps (props) {
    const marks = []
    const dispositions = []
    const titles = []
    console.log(props.skills)
    props.skills
      .filter(item => parseInt(item.mark) > 0)
      .forEach((item, i) => {
        if (i < 15) {
          marks.push(item.mark)
          dispositions.push(item.disposition)
          titles.push(item.skill.title.slice(0,10))
        }
      })

    return {
      data: {
        dataSets: [
          {
            values: dispositions,
            label: 'Disposition',
            config: {
              color: processColor('#FF8C9D'),
              drawFilled: true,
              fillColor: processColor('#FF8C9D'),
              fillAlpha: 30,
              lineWidth: 3
            }
          }, {
            values: marks,
            label: 'Mark',
            config: {
              color: processColor('#C0FF8C'),
              drawFilled: true,
              fillColor: processColor('#C0FF8C'),
              fillAlpha: 30,
              lineWidth: 3
            }
          }
        ],
      },
      xAxis: {
        valueFormatter: titles, //['A', 'B', 'C', 'D', 'E', 'G'],
        textSize: 10,
      }
    }
  }

  handleSelect = (event) => {
    let entry = event.nativeEvent
    if (!entry.hasOwnProperty('value')) {
      console.log('entry == null')
    } else {
      console.log('entry', entry)
    }
    console.log(event.nativeEvent)
  }

  render() {
    console.log(this.state)
    if (this.props.isLoading) {
      return (
        <View><Text>Loading...</Text></View>
      )
    } else {
      return (
        <View style={styles.container}>
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={data.yAxis}
            chartDescription={{text: ''}}
            legend={data.legend}
            drawWeb={true}

            webLineWidth={1}
            webLineWidthInner={1}
            webAlpha={255}
            webColor={processColor("darkblue")}
            webColorInner={processColor("darkblue")}

            onSelect={this.handleSelect}
            onChange={(event) => console.log('changed')}
          />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
      },
      android: {
        backgroundColor: '#ccc',
      },
    }),
  },
});

export default withHeader(connect(
  store => ({
    skills: store.data.skills,
    token: store.auth.token,
    isLoading: store.data.isLoading,
  }),
  dispatch => ({
    getSkills: id => dispatch(getSkills(id)),
  })
  )(SkillsScreen))
