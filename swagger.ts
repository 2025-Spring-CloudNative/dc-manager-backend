const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: 'DC Manager API',
    description: 'API documentation for the DC Manager backend',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  basePath: '/',
  schemes: ['http'],
  // tags: [
  //   {
  //     name: 'DataCenter',
  //     description: '資料中心相關 API',
  //   },
  // ],
  definitions: {
    DataCenter: {
        id: 1,
        name: "Main DC",
        location: "Taipei",
        subnetId: 123
    },
    DataCenterInput: {
        name: "Main DC",
        location: "Taipei",
        subnetId: 123
    },
    Subnet: {
        id: 1,
        cidr: "192.168.1.0/24",
        dataCenterId: 1
    },
    SubnetInput: {
        cidr: "192.168.1.0/24",
        dataCenterId: 1
    },
    Machine: {
        id: 1,
        name: "Server-01",
        rackId: 1,
        ipAddressId: 1
    },
    MachineInput: {
        name: "Server-01",
        rackId: 1,
        ipAddressId: 1
    },
    Rack: {
        id: 1,
        name: "Rack-01",
        roomId: 1
    },
    RackInput: {
        name: "Rack-01",
        roomId: 1
    },
    Room: {
        id: 1,
        name: "Room-01",
        location: "Building A"
    },
    RoomInput: {
        name: "Room-01",
        location: "Building A"
    },
    Service: {
        id: 1,
        name: "Web Server",
        machineId: 1
    },
    ServiceInput: {
        name: "Web Server",
        machineId: 1
    },
    IpAddress: {
        id: 1,
        address: "192.168.1.10",
        subnetId: 1
    },
    IpAddressInput: {
        address: "192.168.1.10",
        subnetId: 1
    },
    IpPool: {
        id: 1,
        rangeStart: "192.168.1.1",
        rangeEnd: "192.168.1.254",
        subnetId: 1
    },
    IpPoolInput: {
        rangeStart: "192.168.1.1",
        rangeEnd: "192.168.1.254",
        subnetId: 1
    }
  }
};
const outputFile = "./docs/swagger/swagger-output.json"
// const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/server.ts"];
// const routes = [
//   "./src/presentation/server/routes/dataCenter.route.ts",
//   "./src/presentation/server/routes/room.route.ts",
//   "./src/presentation/server/routes/rack.route.ts",
//   "./src/presentation/server/routes/machine.route.ts",
//   "./src/presentation/server/routes/service.route.ts",
//   "./src/presentation/server/routes/subnet.route.ts",
//   "./src/presentation/server/routes/ipPool.route.ts",
//   "./src/presentation/server/routes/ipAddress.route.ts",
// ];

swaggerAutogen(outputFile, endpointsFiles, doc);

