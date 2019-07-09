class Station {
    constructor(element, nameId, addressId, statusId, velovNumberId){
        this.name = element.name;
        this.nameId = nameId;
        this.address = element.address;
        this.addressId = addressId;
        this.status = element.status;
        this.statusId = statusId;
        this.velovNumber = element.available_bikes;
        this.velovNumberId = velovNumberId;
        this.position = element.position;
    };
};

export default Station;