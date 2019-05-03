import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { ListItem, Divider, SearchBar } from 'react-native-elements'
import reservations from "../data/reservations"
import Reservation, { PageInfo } from '../data/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

interface Props {
    navigation: NavigationScreenProp<any, NavigationParams>;
}
interface State {
    data?: any[] | null,
    pageInfo?: PageInfo,
    search: String
}
export default class ReservationsScreen extends Component<Props, State> {
  
  constructor(props: Props) {
      super(props)
  }

  static navigationOptions = ( navigation : NavigationScreenProp<any, NavigationParams> ) => {
    return {
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={()=> navigation.navigation.navigate("NewReservation")}>
          <Icon size={20} name={"calendar"} color={"blue"}/>
        </TouchableOpacity>
        )
    };
  };

  state: State = {
      data: null,
      search: ""
  }

  create = () => {

  }

  updateSearch = (search: String) => {
    this.setState({ search });
    reservations.getreservations("", search).then(response => {
        this.setState({ data: response.data, pageInfo: response.pageInfo})
    }); 
  };

  refresh = () => {
    reservations.getreservations(this.state.pageInfo.endCursor, this.state.search).then(response => {
        this.setState({ data: this.state.data.concat(response.data), pageInfo: response.pageInfo})
    }); 
  }

  componentDidMount() {
    reservations.getreservations().then(response => {
        this.setState({ data: response.data, pageInfo: response.pageInfo})
    });
    this.props.navigation.setParams({ create: this.create})
  }

  _renderItem = (item: any) => {
      const i : Reservation = item.item.node;
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ReservationDetails", { reservation: i })}>
        <ListItem
            chevron
            key={i.id}
            leftIcon={{ name: "hotel" }}
            title={i.name || "n/a"}
            subtitle={i.hotelName || "n/a"}
        />
        <Divider/>
        </TouchableOpacity>
      )
    
  }

  render() {
    const { data, search } = this.state;
    if (!data) {
        return (
       <View style={styles.container}>
        <ActivityIndicator/>
      </View>
        )
    }
    return (
      <View>
        <SearchBar
        placeholder="Search reservations..."
        onChangeText={this.updateSearch}
        value={search}
      />
        <FlatList data={data} renderItem={this._renderItem} onEndReached={this.refresh}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});