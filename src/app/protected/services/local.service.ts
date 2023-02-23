import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  //@ts-ignore
  getMyIP(cb) {

    var pc = new RTCPeerConnection ({iceServers: []}),
        noop = () => {};
    //@ts-ignore
    pc.onicecandidate = ice => cb = cb ((ice = ice && ice.candidate && ice.candidate.candidate) ? ice.match (/(\d{1,3}(\.\d{1,3}){3}|[a-f\d]{1,4}(:[a-f\d]{1,4}){7})/)[1]
                   : 'unavailable') || noop;
    pc.createDataChannel ("");
    pc.createOffer (pc.setLocalDescription.bind (pc), noop);
  };
}
