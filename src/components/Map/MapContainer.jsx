import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    mapCenter: {
      lat: this.props.lat,
      lng: this.props.lng
    }
  };

  render() {
    return (
      <div
      style={{
        height: "20rem",
        position: "relative",
      }}>
        <Map google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          style={{
            width: "94%",
            height: "20rem",
            borderRadius: "10px",
            marginTop: "1rem",
            marginLeft: "3%",
          }}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCuQU26WtRM2-Qmkl_wNQqn2nU8p6u35U4')
})(MapContainer)

