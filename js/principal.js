const express = require('express')
const fs = require("fs").promises;
const bodyParser = require('body-parser');
const { Console } = require('console');

const server = express();
var stlString = "";

async function main() {

  server.get('/:param&:param2&:param3&:param4', (req, res) => {
    generateSTL(req.params.param, req.params.param2, req.params.param3, req.params.param4)
  })

  server.listen(8000, () => {
    console.log('En puerto 8000')
  })

}

async function generateSTL(width, depth, height, nLayer) {
  stlString = " solid STL"

  generateVerticalFacet(0, height, depth);
  generateOppositeVerticalFacet(0, height, depth)

  generateVerticalFacet(width, height, depth);
  generateOppositeVerticalFacet(width, height, depth);

  generateHorizontalFacet(width, 0, depth);
  generateOppositeHorizontalFacet(width, 0, depth);

  generateHorizontalFacet(width, height, depth);
  generateOppositeHorizontalFacet(width, height, depth);


  var layerHeight = (height) / (Number(nLayer) + 1)

  for (let layer = 1; layer <= nLayer; layer++) {
    generateHorizontalFacet(width, (layer * layerHeight), depth);
    generateOppositeHorizontalFacet(width, (layer * layerHeight), depth);
  }

  stlString += "\nendsolid STL"

  writeFile();

}

function generateVerticalFacet(width, height, depth) {
  let pointCenter = generatePoint(width, (height / 2), (depth) / 2);

  //First triangle
  let point1 = generatePoint(width, 0, 0);
  let point2 = generatePoint(width, 0, depth);
  facetTriangleString(point1, point2, pointCenter);

  //Second triangle
  let point3 = generatePoint(width, height, depth);
  facetTriangleString(point2, point3, pointCenter);

  //Third triangle
  let point4 = generatePoint(width, height, 0);
  facetTriangleString(point3, point4, pointCenter);

  //Fourth triangle
  facetTriangleString(point4, point1, pointCenter);
}

function generateOppositeVerticalFacet(width, height, depth) {
  let pointCenter = generatePoint(width, (height / 2), (depth) / 2);

  let point1 = generatePoint(width, 0, 0);
  let point2 = generatePoint(width, height, 0);
  facetTriangleString(point1, point2, pointCenter);

  let point3 = generatePoint(width, height, depth);
  facetTriangleString(point2, point3, pointCenter);

  let point4 = generatePoint(width, 0, depth);
  facetTriangleString(point3, point4, pointCenter);

  facetTriangleString(point4, point1, pointCenter);
}

function generateOppositeHorizontalFacet(width, height, depth) {
  let pointCenter = generatePoint((width / 2), height, (depth / 2));

  //Triangle 1
  let point1 = generatePoint(0, height, 0);
  let point2 = generatePoint(width, height, 0);
  facetTriangleString(point1, point2, pointCenter);

  //Triangle 2
  let point3 = generatePoint(width, height, depth);
  facetTriangleString(point2, point3, pointCenter);

  let point4 = generatePoint(0, height, depth);
  facetTriangleString(point3, point4, pointCenter);

  facetTriangleString(point4, point1, pointCenter);
}

function generateHorizontalFacet(width, height, depth) {
  let pointCenter = generatePoint((width) / 2, height, (depth) / 2);

  //First triangle
  let point1 = generatePoint(0, height, 0);
  let point2 = generatePoint(0, height, depth);
  facetTriangleString(point1, point2, pointCenter);

  //Second Triangle
  point3 = generatePoint(width, height, depth);
  facetTriangleString(point2, point3, pointCenter);

  //Third Triangle
  let point4 = generatePoint(width, height, 0);
  facetTriangleString(point3, point4, pointCenter);

  //Fourth Triangle
  facetTriangleString(point4, point1, pointCenter);
}

function generatePoint(x, y, z) {
  let point = new Object();
  point.x = x;
  point.y = y;
  point.z = z;

  return point;
}

function facetTriangleString(point1, point2, pointCenter) {
  let nVec = calculateNVector(points2Vector(point1, point2), points2Vector(point1, pointCenter));
  stlString += `\n facet normal ${nVec.x} ${nVec.y} ${nVec.z}`
  stlString += `\n  outer loop`
  stlString += `\n   vertex ${point1.x} ${point1.y} ${point1.z}`
  stlString += `\n   vertex ${point2.x} ${point2.y} ${point2.z}`
  stlString += `\n   vertex ${pointCenter.x} ${pointCenter.y} ${pointCenter.z}`
  stlString += `\n  endloop`
  stlString += `\n endfacet`
}

function points2Vector(p1, p2) {
  //p1 -> p2 (p2 - p1)
  let vec = new Object();
  vec.x = p2.x - p1.x;
  vec.y = p2.y - p1.y;
  vec.z = p2.z - p1.z;
  return vec;
}

function calculateNVector(v1, v2) {
  let vec = new Object();
  vec.x = (v1.y * v2.z - v1.z * v2.y)
  vec.y = (v1.z * v2.x - v1.x * v2.z)
  vec.z = (v1.x * v2.y - v1.y * v2.x)
  return vec;
}

function writeFile() {
  fs.writeFile('./js/salida.stl', stlString, (err) => {
    if (err) console.log(err)
  })
}

main();