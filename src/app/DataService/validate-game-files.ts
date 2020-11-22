import {DataServiceService} from './data-service.service';

export class ValidateGameFiles{
  public data: DataServiceService;

  constructor(data: DataServiceService) {
    this.data = data;
  }

/*  public Validate(gf: GameFile): boolean{
    for (const room: Room of gf.Rooms){ // TODO not Iterable

      for (const {nextScene}: Option of room){
        let doesRoomExist: Room;
        doesRoomExist = this.data.getRoomFromId(nextScene);
        if (doesRoomExist === undefined ){
          console.log('Trying to lead to Room ' + nextScene + ' but no such scene exists');
        }
      }
    }
    return true;
  }
*/
}
