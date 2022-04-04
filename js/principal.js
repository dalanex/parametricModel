const express = require('express')
const fs = require("fs");
const bodyParser = require('body-parser');
const { Console } = require('console');

const server = express();
var stlString = " solid STL";

async function main() {

  // server.get('/params/:param&:param2&:param3&:param4', (req, res) => {
  //   res.send({ message: `HOLA tu parametro ${req.params.param}  ${req.params.param2} ${req.params.param3} ${req.params.param4}` })
  //   generarSTL(req.params.width)
  // })

  // server.listen(8000, () => {
  //   console.log('En puerto 8000')
  // })

  await generarSTL(2, 2, 2, 3);

  stlString += "\nendsolid STL"

  fs.writeFile('./salida.stl', stlString, (err) => {
    if (err) console.log(err)
  })

  console.log(stlString.length)
}

function generarSTL(width, depth, height, nLayer) {

  //Generar caras verticales 
  //Pared Lateral sobre x = 0
  generateVerticalFacet(0, height, depth);
  generateOppositeVerticalFacet(0, height, depth)
  //Pared Lateral sobre x = width
  generateVerticalFacet(width, height, depth);
  generateOppositeVerticalFacet(width, height, depth);
  //Generar caras horizontales
  //Generar base 
  generateHorizontalFacet(width, 0, depth);
  generateOppositeHorizontalFacet(width, 0, depth);
  //Generar tapa superior 
  generateHorizontalFacet(width, height, depth);
  generateOppositeHorizontalFacet(width, height, depth);

  //altura entre capas
  var layerHeight = (height) / (nLayer + 1) //layer+1 si son nº "estantes" y layer si nº huecos
  //bucle para N capas
  for (let layer = 1; layer <= nLayer; layer++) {
    generateHorizontalFacet(width, (layer * layerHeight), depth);
    generateOppositeHorizontalFacet(width, (layer * layerHeight), depth);
  }

}

function generateVerticalFacet(width, height, depth) {
  let pointCenter = GeneratePoint(width, (height / 2), (depth) / 2);

  //First triangle
  let point1 = GeneratePoint(width, 0, 0);
  let point2 = GeneratePoint(width, 0, depth);
  FacetTrinagleString(point1, point2, pointCenter);

  //Second triangle
  let point3 = GeneratePoint(width, height, depth);
  FacetTrinagleString(point2, point3, pointCenter);

  //Third triangle
  let point4 = GeneratePoint(width, height, 0);
  FacetTrinagleString(point3, point4, pointCenter);

  //Fourth triangle
  FacetTrinagleString(point4, point1, pointCenter);
}

function generateOppositeVerticalFacet(width, height, depth) {
  let pointCenter = GeneratePoint(width, (height / 2), (depth) / 2);

  let point1 = GeneratePoint(width, 0, 0);
  let point2 = GeneratePoint(width, height, 0);
  FacetTrinagleString(point1, point2, pointCenter);

  let point3 = GeneratePoint(width, height, depth);
  FacetTrinagleString(point2, point3, pointCenter);

  let point4 = GeneratePoint(width, 0, depth);
  FacetTrinagleString(point3, point4, pointCenter);

  FacetTrinagleString(point4, point1, pointCenter);
}

function generateOppositeHorizontalFacet(width, height, depth) {
  let pointCenter = GeneratePoint((width/2), height, (depth/2) );

  //Triangle 1
  let point1 = GeneratePoint(0, height, 0);
  let point2 = GeneratePoint(width, height, 0);
  FacetTrinagleString(point1, point2, pointCenter);

  //Triangle 2
  let point3 = GeneratePoint(width, height, depth);
  FacetTrinagleString(point2, point3, pointCenter);

  let point4 = GeneratePoint(0, height, depth);
  FacetTrinagleString(point3, point4, pointCenter);

  FacetTrinagleString(point4, point1, pointCenter);
}

function generateHorizontalFacet(width, height, depth) {
  let pointCenter = GeneratePoint((width) / 2, height, (depth) / 2);

  //First triangle
  let point1 = GeneratePoint(0, height, 0);
  let point2 = GeneratePoint(0, height, depth);
  FacetTrinagleString(point1, point2, pointCenter);

  //Second Triangle
  point3 = GeneratePoint(width, height, depth);
  FacetTrinagleString(point2, point3, pointCenter);

  //Third Triangle
  let point4 = GeneratePoint(width, height, 0);
  FacetTrinagleString(point3, point4, pointCenter);

  //Fourth Triangle
  FacetTrinagleString(point4, point1, pointCenter);
}

function GeneratePoint(x, y, z) {
  let point = new Object();
  point.x = x;
  point.y = y;
  point.z = z;

  return point;
}

function FacetTrinagleString(point1, point2, pointCenter) {
  let nVec = CalculateNVector(Points2Vector(point1, point2), Points2Vector(point1, pointCenter));
  stlString += `\n facet normal ${nVec.x} ${nVec.y} ${nVec.z}`
  stlString += `\n  outer loop`
  stlString += `\n   vertex ${point1.x} ${point1.y} ${point1.z}`
  stlString += `\n   vertex ${point2.x} ${point2.y} ${point2.z}`
  stlString += `\n   vertex ${pointCenter.x} ${pointCenter.y} ${pointCenter.z}`
  stlString += `\n  endloop`
  stlString += `\n endfacet`
}

function Points2Vector(p1, p2) {
  //p1 -> p2 (p2 - p1)
  let vec = new Object();
  vec.x = p2.x - p1.x;
  vec.y = p2.y - p1.y;
  vec.z = p2.z - p1.z;
  return vec;
}

function CalculateNVector(v1, v2) {
  let vec = new Object();
  vec.x = (v1.y * v2.z - v1.z * v2.y)
  vec.y = (v1.z * v2.x - v1.x * v2.z)
  vec.z = (v1.x * v2.y - v1.y * v2.x)
  return vec;
}


main();