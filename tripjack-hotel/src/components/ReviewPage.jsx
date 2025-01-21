
import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper, Button, Grid ,Box,Modal} from '@mui/material';
import "../styles/Review.css";
import {
  
 
  TextField,
  Select,
  MenuItem,
 
  InputAdornment,
} from "@mui/material";
const ReviewPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const location = useLocation();
  const data = location.state?.data || null; // Access the data passed via navigate
  console.log(data);
  const openModal = (data) => {
    setModalData(data); // Set the data to be displayed in the modal
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const getCnpDetails = (alert) => {
    return alert.oldCnp.ifra ? alert.newCnp : alert.oldCnp;
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const countries = 
  ﻿[
    {
      "countryname": "India",
      "name": "India",
      "dial_code": "91",
      "countryid": "106",
      "code": "IN",
      "isocode": "IND"
    },
    {
      "countryname": "Afghanistan",
      "name": "Afghanistan",
      "dial_code": "93",
      "countryid": "97",
      "code": "AF",
      "isocode": "AFG"
    },
    {
      "countryname": "Albania",
      "name": "Albania",
      "dial_code": "355",
      "countryid": "43",
      "code": "AL",
      "isocode": "ALB"
    },
    {
      "countryname": "Algeria",
      "name": "Algeria",
      "dial_code": "213",
      "countryid": "142",
      "code": "DZ",
      "isocode": "DZA"
    },
    {
      "countryname": "Andorra",
      "name": "Andorra",
      "dial_code": "376",
      "countryid": "44",
      "code": "AD",
      "isocode": "AND"
    },
    {
      "countryname": "Angola",
      "name": "Angola",
      "dial_code": "244",
      "countryid": "143",
      "code": "AO",
      "isocode": "AGO"
    },
    {
      "countryname": "Argentina",
      "name": "Argentina",
      "dial_code": "54",
      "countryid": "29",
      "code": "AR",
      "isocode": "ARG"
    },
    {
      "countryname": "Armenia",
      "name": "Armenia",
      "dial_code": "374",
      "countryid": "45",
      "code": "AM",
      "isocode": "ARM"
    },
    {
      "countryname": "Aruba",
      "name": "Aruba",
      "dial_code": "297",
      "countryid": "231",
      "code": "AW",
      "isocode": "ABW"
    },
    {
      "countryname": "Australia",
      "name": "Australia",
      "dial_code": "61",
      "countryid": "196",
      "code": "AU",
      "isocode": "AUS"
    },
    {
      "countryname": "Austria",
      "name": "Austria",
      "dial_code": "43",
      "countryid": "46",
      "code": "AT",
      "isocode": "AUT"
    },
    {
      "countryname": "Azerbaijan",
      "name": "Azerbaijan",
      "dial_code": "994",
      "countryid": "47",
      "code": "AZ",
      "isocode": "AZE"
    },
    {
      "countryname": "Bahamas",
      "name": "Bahamas",
      "dial_code": "1242",
      "countryid": "3",
      "code": "BS",
      "isocode": "BHS"
    },
    {
      "countryname": "Bahrain",
      "name": "Bahrain",
      "dial_code": "973",
      "countryid": "98",
      "code": "BH",
      "isocode": "BHR"
    },
    {
      "countryname": "Bangladesh",
      "name": "Bangladesh",
      "dial_code": "880",
      "countryid": "99",
      "code": "BD",
      "isocode": "BGD"
    },
    {
      "countryname": "Barbados",
      "name": "Barbados",
      "dial_code": "1246",
      "countryid": "4",
      "code": "BB",
      "isocode": "BRB"
    },
    {
      "countryname": "Belarus",
      "name": "Belarus",
      "dial_code": "375",
      "countryid": "48",
      "code": "BY",
      "isocode": "BLR"
    },
    {
      "countryname": "Belgium",
      "name": "Belgium",
      "dial_code": "32",
      "countryid": "49",
      "code": "BE",
      "isocode": "BEL"
    },
    {
      "countryname": "Belize",
      "name": "Belize",
      "dial_code": "501",
      "countryid": "5",
      "code": "BZ",
      "isocode": "BLZ"
    },
    {
      "countryname": "Benin",
      "name": "Benin",
      "dial_code": "229",
      "countryid": "144",
      "code": "BJ",
      "isocode": "BEN"
    },
    {
      "countryname": "Bermuda",
      "name": "Bermuda",
      "dial_code": "1441",
      "countryid": "6",
      "code": "BM",
      "isocode": "BMU"
    },
    {
      "countryname": "Bhutan",
      "name": "Bhutan",
      "dial_code": "975",
      "countryid": "100",
      "code": "BT",
      "isocode": "BTN"
    },
    {
      "countryname": "Bolivia",
      "name": "Bolivia",
      "dial_code": "591",
      "countryid": "30",
      "code": "BO",
      "isocode": "BOL"
    },
    {
      "countryname": "Bosnia and Herzegovina",
      "name": "Bosnia and Herzegovina",
      "dial_code": "387",
      "countryid": "50",
      "code": "BA",
      "isocode": "BIH"
    },
    {
      "countryname": "Botswana",
      "name": "Botswana",
      "dial_code": "267",
      "countryid": "145",
      "code": "BW",
      "isocode": "BWA"
    },
    {
      "countryname": "Brazil",
      "name": "Brazil",
      "dial_code": "55",
      "countryid": "31",
      "code": "BR",
      "isocode": "BRA"
    },
    {
      "countryname": "British Virgin Islands",
      "name": "British Virgin Islands",
      "dial_code": "1284",
      "countryid": "7",
      "code": "VG",
      "isocode": "VGB"
    },
    {
      "countryname": "Brunei",
      "name": "Brunei",
      "dial_code": "673",
      "countryid": "101",
      "code": "BN",
      "isocode": "BRN"
    },
    {
      "countryname": "Bulgaria",
      "name": "Bulgaria",
      "dial_code": "359",
      "countryid": "51",
      "code": "BG",
      "isocode": "BGR"
    },
    {
      "countryname": "Burkina Faso",
      "name": "Burkina Faso",
      "dial_code": "226",
      "countryid": "146",
      "code": "BF",
      "isocode": "BFA"
    },
    {
      "countryname": "Burundi",
      "name": "Burundi",
      "dial_code": "257",
      "countryid": "147",
      "code": "BI",
      "isocode": "BDI"
    },
    {
      "countryname": "Cambodia",
      "name": "Cambodia",
      "dial_code": "855",
      "countryid": "102",
      "code": "KH",
      "isocode": "KHM"
    },
    {
      "countryname": "Cameroon",
      "name": "Cameroon",
      "dial_code": "237",
      "countryid": "148",
      "code": "CM",
      "isocode": "CMR"
    },
    {
      "countryname": "Canada",
      "name": "Canada",
      "dial_code": "1",
      "countryid": "2",
      "code": "CA",
      "isocode": "CAN"
    },
    {
      "countryname": "Cape Verde",
      "name": "Cape Verde",
      "dial_code": "238",
      "countryid": "149",
      "code": "CV",
      "isocode": "CPV"
    },
    {
      "countryname": "Cayman Islands",
      "name": "Cayman Islands",
      "dial_code": "1345",
      "countryid": "8",
      "code": "KY",
      "isocode": "CYM"
    },
    {
      "countryname": "Central African Republic",
      "name": "Central African Republic",
      "dial_code": "236",
      "countryid": "150",
      "code": "CF",
      "isocode": "CAF"
    },
    {
      "countryname": "Chad",
      "name": "Chad",
      "dial_code": "235",
      "countryid": "151",
      "code": "TD",
      "isocode": "TCD"
    },
    {
      "countryname": "Chile",
      "name": "Chile",
      "dial_code": "56",
      "countryid": "32",
      "code": "CL",
      "isocode": "CHL"
    },
    {
      "countryname": "China",
      "name": "China",
      "dial_code": "86",
      "countryid": "103",
      "code": "CN",
      "isocode": "CHN"
    },
    {
      "countryname": "Colombia",
      "name": "Colombia",
      "dial_code": "57",
      "countryid": "33",
      "code": "CO",
      "isocode": "COL"
    },
    {
      "countryname": "Comoros",
      "name": "Comoros",
      "dial_code": "269",
      "countryid": "294",
      "code": "KM",
      "isocode": "COM"
    },
    {
      "countryname": "Costa Rica",
      "name": "Costa Rica",
      "dial_code": "506",
      "countryid": "9",
      "code": "CR",
      "isocode": "CRC"
    },
    {
      "countryname": "Croatia",
      "name": "Croatia",
      "dial_code": "385",
      "countryid": "52",
      "code": "HR",
      "isocode": "HRV"
    },
    {
      "countryname": "Cuba",
      "name": "Cuba",
      "dial_code": "53",
      "countryid": "10",
      "code": "CU",
      "isocode": "CUB"
    },
    {
      "countryname": "Cyprus",
      "name": "Cyprus",
      "dial_code": "357",
      "countryid": "53",
      "code": "CY",
      "isocode": "CYP"
    },
    {
      "countryname": "Czech Republic",
      "name": "Czech Republic",
      "dial_code": "420",
      "countryid": "54",
      "code": "CZ",
      "isocode": "CZE"
    },
    {
      "countryname": "Democratic Republic of the Congo",
      "name": "Democratic Republic of the Congo",
      "dial_code": "243",
      "countryid": "153",
      "code": "CD",
      "isocode": "COD"
    },
    {
      "countryname": "Denmark",
      "name": "Denmark",
      "dial_code": "45",
      "countryid": "55",
      "code": "DK",
      "isocode": "DNK"
    },
    {
      "countryname": "Djibouti",
      "name": "Djibouti",
      "dial_code": "253",
      "countryid": "154",
      "code": "DJ",
      "isocode": "DJI"
    },
    {
      "countryname": "Dominica",
      "name": "Dominica",
      "dial_code": "1767",
      "countryid": "11",
      "code": "DM",
      "isocode": "DMA"
    },
    {
      "countryname": "Dominican Republic",
      "name": "Dominican Republic",
      "dial_code": "1 809, 1 829, 1 849",
      "countryid": "12",
      "code": "DO",
      "isocode": "DOM"
    },
    {
      "countryname": "Ecuador",
      "name": "Ecuador",
      "dial_code": "593",
      "countryid": "34",
      "code": "EC",
      "isocode": "ECU"
    },
    {
      "countryname": "Egypt",
      "name": "Egypt",
      "dial_code": "20",
      "countryid": "155",
      "code": "EG",
      "isocode": "EGY"
    },
    {
      "countryname": "El Salvador",
      "name": "El Salvador",
      "dial_code": "503",
      "countryid": "13",
      "code": "SV",
      "isocode": "SLV"
    },
    {
      "countryname": "Equatorial Guinea",
      "name": "Equatorial Guinea",
      "dial_code": "240",
      "countryid": "156",
      "code": "GQ",
      "isocode": "GNQ"
    },
    {
      "countryname": "Eritrea",
      "name": "Eritrea",
      "dial_code": "291",
      "countryid": "157",
      "code": "ER",
      "isocode": "ERI"
    },
    {
      "countryname": "Estonia",
      "name": "Estonia",
      "dial_code": "372",
      "countryid": "56",
      "code": "EE",
      "isocode": "EST"
    },
    {
      "countryname": "Ethiopia",
      "name": "Ethiopia",
      "dial_code": "251",
      "countryid": "158",
      "code": "ET",
      "isocode": "ETH"
    },
    {
      "countryname": "Falkland Islands",
      "name": "Falkland Islands",
      "dial_code": "500",
      "countryid": "35",
      "code": "FK",
      "isocode": "FLK"
    },
    {
      "countryname": "Fiji",
      "name": "Fiji",
      "dial_code": "679",
      "countryid": "198",
      "code": "FJ",
      "isocode": "FJI"
    },
    {
      "countryname": "Finland",
      "name": "Finland",
      "dial_code": "358",
      "countryid": "57",
      "code": "FI",
      "isocode": "FIN"
    },
    {
      "countryname": "France",
      "name": "France",
      "dial_code": "33",
      "countryid": "58",
      "code": "FR",
      "isocode": "FRA"
    },
    {
      "countryname": "French Guiana",
      "name": "French Guiana",
      "dial_code": "594",
      "countryid": "36",
      "code": "GF",
      "isocode": "GUF"
    },
    {
      "countryname": "French Polynesia",
      "name": "French Polynesia",
      "dial_code": "689",
      "countryid": "199",
      "code": "PF",
      "isocode": "PYF"
    },
    {
      "countryname": "Gabon",
      "name": "Gabon",
      "dial_code": "241",
      "countryid": "159",
      "code": "GA",
      "isocode": "GAB"
    },
    {
      "countryname": "Gambia",
      "name": "Gambia",
      "dial_code": "220",
      "countryid": "160",
      "code": "GM",
      "isocode": "GMB"
    },
    {
      "countryname": "Georgia",
      "name": "Georgia",
      "dial_code": "995",
      "countryid": "59",
      "code": "GE",
      "isocode": "GEO"
    },
    {
      "countryname": "Germany",
      "name": "Germany",
      "dial_code": "49",
      "countryid": "60",
      "code": "DE",
      "isocode": "DEU"
    },
    {
      "countryname": "Ghana",
      "name": "Ghana",
      "dial_code": "233",
      "countryid": "161",
      "code": "GH",
      "isocode": "GHA"
    },
    {
      "countryname": "Gibraltar",
      "name": "Gibraltar",
      "dial_code": "350",
      "countryid": "61",
      "code": "GI",
      "isocode": "GIB"
    },
    {
      "countryname": "Greece",
      "name": "Greece",
      "dial_code": "30",
      "countryid": "62",
      "code": "GR",
      "isocode": "GRC"
    },
    {
      "countryname": "Greenland",
      "name": "Greenland",
      "dial_code": "299",
      "countryid": "14",
      "code": "GL",
      "isocode": "GRL"
    },
    {
      "countryname": "Grenada",
      "name": "Grenada",
      "dial_code": "1473",
      "countryid": "15",
      "code": "GD",
      "isocode": "GRD"
    },
    {
      "countryname": "Guadeloupe",
      "name": "Guadeloupe",
      "dial_code": "590",
      "countryid": "16",
      "code": "GP",
      "isocode": "GLP"
    },
    {
      "countryname": "Guam",
      "name": "Guam",
      "dial_code": "1671",
      "countryid": "200",
      "code": "GU",
      "isocode": "GUM"
    },
    {
      "countryname": "Guatemala",
      "name": "Guatemala",
      "dial_code": "502",
      "countryid": "17",
      "code": "GT",
      "isocode": "GTM"
    },
    {
      "countryname": "Guinea",
      "name": "Guinea",
      "dial_code": "224",
      "countryid": "162",
      "code": "GN",
      "isocode": "GIN"
    },
    {
      "countryname": "Guinea-Bissau",
      "name": "Guinea-Bissau",
      "dial_code": "245",
      "countryid": "163",
      "code": "GW",
      "isocode": "GNB"
    },
    {
      "countryname": "Guyana",
      "name": "Guyana",
      "dial_code": "592",
      "countryid": "37",
      "code": "GY",
      "isocode": "GUY"
    },
    {
      "countryname": "Haiti",
      "name": "Haiti",
      "dial_code": "509",
      "countryid": "18",
      "code": "HT",
      "isocode": "HTI"
    },
    {
      "countryname": "Honduras",
      "name": "Honduras",
      "dial_code": "504",
      "countryid": "19",
      "code": "HN",
      "isocode": "HND"
    },
    {
      "countryname": "Hong Kong",
      "name": "Hong Kong",
      "dial_code": "852",
      "countryid": "105",
      "code": "HK",
      "isocode": "HKG"
    },
    {
      "countryname": "Hungary",
      "name": "Hungary",
      "dial_code": "36",
      "countryid": "64",
      "code": "HU",
      "isocode": "HUN"
    },
    {
      "countryname": "Iceland",
      "name": "Iceland",
      "dial_code": "354",
      "countryid": "65",
      "code": "IS",
      "isocode": "IS"
    },
    {
      "countryname": "Indonesia",
      "name": "Indonesia",
      "dial_code": "62",
      "countryid": "107",
      "code": "ID",
      "isocode": "IDN"
    },
    {
      "countryname": "Iran",
      "name": "Iran",
      "dial_code": "98",
      "countryid": "108",
      "code": "IR",
      "isocode": "IRN"
    },
    {
      "countryname": "Iraq",
      "name": "Iraq",
      "dial_code": "964",
      "countryid": "109",
      "code": "IQ",
      "isocode": "IRQ"
    },
    {
      "countryname": "Ireland",
      "name": "Ireland",
      "dial_code": "353",
      "countryid": "66",
      "code": "IE",
      "isocode": "IRL"
    },
    {
      "countryname": "Isle of Man",
      "name": "Isle of Man",
      "dial_code": "44",
      "countryid": "67",
      "code": "IM",
      "isocode": "IMN"
    },
    {
      "countryname": "Israel",
      "name": "Israel",
      "dial_code": "972",
      "countryid": "110",
      "code": "IL",
      "isocode": "ISR"
    },
    {
      "countryname": "Italy",
      "name": "Italy",
      "dial_code": "39",
      "countryid": "68",
      "code": "IT",
      "isocode": "ITA"
    },
    {
      "countryname": "Ivory Coast",
      "name": "Ivory Coast",
      "dial_code": "225",
      "countryid": "164",
      "code": "CI",
      "isocode": "CIV"
    },
    {
      "countryname": "Jamaica",
      "name": "Jamaica",
      "dial_code": "1876",
      "countryid": "20",
      "code": "JM",
      "isocode": "JAM"
    },
    {
      "countryname": "Japan",
      "name": "Japan",
      "dial_code": "81",
      "countryid": "111",
      "code": "JP",
      "isocode": "JPN"
    },
    {
      "countryname": "Jersey",
      "name": "Jersey",
      "dial_code": "44",
      "countryid": "69",
      "code": "JE",
      "isocode": "JEY"
    },
    {
      "countryname": "Jordan",
      "name": "Jordan",
      "dial_code": "962",
      "countryid": "112",
      "code": "JO",
      "isocode": "JOR"
    },
    {
      "countryname": "Kazakhstan",
      "name": "Kazakhstan",
      "dial_code": "7",
      "countryid": "113",
      "code": "KZ",
      "isocode": "KAZ"
    },
    {
      "countryname": "Kenya",
      "name": "Kenya",
      "dial_code": "254",
      "countryid": "165",
      "code": "KE",
      "isocode": "KEN"
    },
    {
      "countryname": "Kiribati",
      "name": "Kiribati",
      "dial_code": "686",
      "countryid": "201",
      "code": "KI",
      "isocode": "KIR"
    },
    {
      "countryname": "Kuwait",
      "name": "Kuwait",
      "dial_code": "965",
      "countryid": "114",
      "code": "KW",
      "isocode": "KWT"
    },
    {
      "countryname": "Kyrgyzstan",
      "name": "Kyrgyzstan",
      "dial_code": "996",
      "countryid": "115",
      "code": "KG",
      "isocode": "KGZ"
    },
    {
      "countryname": "Laos",
      "name": "Laos",
      "dial_code": "856",
      "countryid": "116",
      "code": "LA",
      "isocode": "LAO"
    },
    {
      "countryname": "Latvia",
      "name": "Latvia",
      "dial_code": "371",
      "countryid": "71",
      "code": "LV",
      "isocode": "LVA"
    },
    {
      "countryname": "Lebanon",
      "name": "Lebanon",
      "dial_code": "961",
      "countryid": "117",
      "code": "LB",
      "isocode": "LBN"
    },
    {
      "countryname": "Lesotho",
      "name": "Lesotho",
      "dial_code": "266",
      "countryid": "166",
      "code": "LS",
      "isocode": "LSO"
    },
    {
      "countryname": "Liberia",
      "name": "Liberia",
      "dial_code": "231",
      "countryid": "167",
      "code": "LR",
      "isocode": "LBR"
    },
    {
      "countryname": "Libya",
      "name": "Libya",
      "dial_code": "218",
      "countryid": "168",
      "code": "LY",
      "isocode": "LBY"
    },
    {
      "countryname": "Liechtenstein",
      "name": "Liechtenstein",
      "dial_code": "423",
      "countryid": "72",
      "code": "LI",
      "isocode": "LIE"
    },
    {
      "countryname": "Lithuania",
      "name": "Lithuania",
      "dial_code": "370",
      "countryid": "73",
      "code": "LT",
      "isocode": "LTU"
    },
    {
      "countryname": "Luxembourg",
      "name": "Luxembourg",
      "dial_code": "352",
      "countryid": "74",
      "code": "LU",
      "isocode": "LUX"
    },
    {
      "countryname": "Macau",
      "name": "Macau",
      "dial_code": "853",
      "countryid": "118",
      "code": "MO",
      "isocode": "MAC"
    },
    {
      "countryname": "Macedonia",
      "name": "Macedonia",
      "dial_code": "389",
      "countryid": "75",
      "code": "MK",
      "isocode": "MKD"
    },
    {
      "countryname": "Madagascar",
      "name": "Madagascar",
      "dial_code": "261",
      "countryid": "169",
      "code": "MG",
      "isocode": "MDG"
    },
    {
      "countryname": "Malawi",
      "name": "Malawi",
      "dial_code": "265",
      "countryid": "170",
      "code": "MW",
      "isocode": "MWI"
    },
    {
      "countryname": "Malaysia",
      "name": "Malaysia",
      "dial_code": "60",
      "countryid": "119",
      "code": "MY",
      "isocode": "MYS"
    },
    {
      "countryname": "Maldives",
      "name": "Maldives",
      "dial_code": "960",
      "countryid": "120",
      "code": "MV",
      "isocode": "MDV"
    },
    {
      "countryname": "Mali",
      "name": "Mali",
      "dial_code": "223",
      "countryid": "171",
      "code": "ML",
      "isocode": "MLI"
    },
    {
      "countryname": "Malta",
      "name": "Malta",
      "dial_code": "356",
      "countryid": "76",
      "code": "MT",
      "isocode": "MLT"
    },
    {
      "countryname": "Marshall Islands",
      "name": "Marshall Islands",
      "dial_code": "692",
      "countryid": "202",
      "code": "MH",
      "isocode": "MHL"
    },
    {
      "countryname": "Martinique",
      "name": "Martinique",
      "dial_code": "596",
      "countryid": "21",
      "code": "MQ",
      "isocode": "MTQ"
    },
    {
      "countryname": "Mauritania",
      "name": "Mauritania",
      "dial_code": "222",
      "countryid": "172",
      "code": "MR",
      "isocode": "MRT"
    },
    {
      "countryname": "Mauritius",
      "name": "Mauritius",
      "dial_code": "230",
      "countryid": "173",
      "code": "MU",
      "isocode": "MUS"
    },
    {
      "countryname": "Mexico",
      "name": "Mexico",
      "dial_code": "52",
      "countryid": "22",
      "code": "MX",
      "isocode": "MEX"
    },
    {
      "countryname": "Micronesia",
      "name": "Micronesia",
      "dial_code": "691",
      "countryid": "203",
      "code": "FM",
      "isocode": "FSM"
    },
    {
      "countryname": "Moldova",
      "name": "Moldova",
      "dial_code": "373",
      "countryid": "77",
      "code": "MD",
      "isocode": "MDA"
    },
    {
      "countryname": "Monaco",
      "name": "Monaco",
      "dial_code": "377",
      "countryid": "78",
      "code": "MC",
      "isocode": "MCO"
    },
    {
      "countryname": "Mongolia",
      "name": "Mongolia",
      "dial_code": "976",
      "countryid": "121",
      "code": "MN",
      "isocode": "MNG"
    },
    {
      "countryname": "Montenegro",
      "name": "Montenegro",
      "dial_code": "382",
      "countryid": "79",
      "code": "ME",
      "isocode": "MNE"
    },
    {
      "countryname": "Montserrat",
      "name": "Montserrat",
      "dial_code": "1664",
      "countryid": "23",
      "code": "MS",
      "isocode": "MSR"
    },
    {
      "countryname": "Morocco",
      "name": "Morocco",
      "dial_code": "212",
      "countryid": "174",
      "code": "MA",
      "isocode": "MAR"
    },
    {
      "countryname": "Mozambique",
      "name": "Mozambique",
      "dial_code": "258",
      "countryid": "175",
      "code": "MZ",
      "isocode": "MOZ"
    },
    {
      "countryname": "Namibia",
      "name": "Namibia",
      "dial_code": "264",
      "countryid": "176",
      "code": "NA",
      "isocode": "NAM"
    },
    {
      "countryname": "Nepal",
      "name": "Nepal",
      "dial_code": "977",
      "countryid": "123",
      "code": "NP",
      "isocode": "NPL"
    },
    {
      "countryname": "Netherlands",
      "name": "Netherlands",
      "dial_code": "31",
      "countryid": "80",
      "code": "NL",
      "isocode": "NLD"
    },
    {
      "countryname": "New Caledonia",
      "name": "New Caledonia",
      "dial_code": "687",
      "countryid": "205",
      "code": "NC",
      "isocode": "NCL"
    },
    {
      "countryname": "New Zealand",
      "name": "New Zealand",
      "dial_code": "64",
      "countryid": "197",
      "code": "NZ",
      "isocode": "NZL"
    },
    {
      "countryname": "Nicaragua",
      "name": "Nicaragua",
      "dial_code": "505",
      "countryid": "24",
      "code": "NI",
      "isocode": "NIC"
    },
    {
      "countryname": "Niger",
      "name": "Niger",
      "dial_code": "227",
      "countryid": "177",
      "code": "NE",
      "isocode": "NER"
    },
    {
      "countryname": "Nigeria",
      "name": "Nigeria",
      "dial_code": "234",
      "countryid": "178",
      "code": "NG",
      "isocode": "NGA"
    },
    {
      "countryname": "North Korea",
      "name": "North Korea",
      "dial_code": "850",
      "countryid": "124",
      "code": "KP",
      "isocode": "PRK"
    },
    {
      "countryname": "Norway",
      "name": "Norway",
      "dial_code": "47",
      "countryid": "81",
      "code": "NO",
      "isocode": "NOR"
    },
    {
      "countryname": "Oman",
      "name": "Oman",
      "dial_code": "968",
      "countryid": "125",
      "code": "OM",
      "isocode": "OMN"
    },
    {
      "countryname": "Pakistan",
      "name": "Pakistan",
      "dial_code": "92",
      "countryid": "126",
      "code": "PK",
      "isocode": "PAK"
    },
    {
      "countryname": "Palestine",
      "name": "Palestine",
      "dial_code": "970",
      "countryid": "228",
      "code": "PS",
      "isocode": "PSE"
    },
    {
      "countryname": "Panama",
      "name": "Panama",
      "dial_code": "507",
      "countryid": "25",
      "code": "PA",
      "isocode": "PAN"
    },
    {
      "countryname": "Papua New Guinea",
      "name": "Papua New Guinea",
      "dial_code": "675",
      "countryid": "206",
      "code": "PG",
      "isocode": "PNG"
    },
    {
      "countryname": "Paraguay",
      "name": "Paraguay",
      "dial_code": "595",
      "countryid": "38",
      "code": "PY",
      "isocode": "PRY"
    },
    {
      "countryname": "Peru",
      "name": "Peru",
      "dial_code": "51",
      "countryid": "39",
      "code": "PE",
      "isocode": "PER"
    },
    {
      "countryname": "Philippines",
      "name": "Philippines",
      "dial_code": "63",
      "countryid": "127",
      "code": "PH",
      "isocode": "PHL"
    },
    {
      "countryname": "Poland",
      "name": "Poland",
      "dial_code": "48",
      "countryid": "82",
      "code": "PL",
      "isocode": "POL"
    },
    {
      "countryname": "Portugal",
      "name": "Portugal",
      "dial_code": "351",
      "countryid": "83",
      "code": "PT",
      "isocode": "PRT"
    },
    {
      "countryname": "Puerto Rico",
      "name": "Puerto Rico",
      "dial_code": "1 787, 1 939",
      "countryid": "26",
      "code": "PR",
      "isocode": "PRI"
    },
    {
      "countryname": "Qatar",
      "name": "Qatar",
      "dial_code": "974",
      "countryid": "128",
      "code": "QA",
      "isocode": "QAT"
    },
    {
      "countryname": "Republic of the Congo",
      "name": "Republic of the Congo",
      "dial_code": "242",
      "countryid": "152",
      "code": "CG",
      "isocode": "COG"
    },
    {
      "countryname": "Romania",
      "name": "Romania",
      "dial_code": "40",
      "countryid": "84",
      "code": "RO",
      "isocode": "ROU"
    },
    {
      "countryname": "Russia",
      "name": "Russia",
      "dial_code": "7",
      "countryid": "85",
      "code": "RU",
      "isocode": "RUS"
    },
    {
      "countryname": "Rwanda",
      "name": "Rwanda",
      "dial_code": "250",
      "countryid": "180",
      "code": "RW",
      "isocode": "RWA"
    },
    {
      "countryname": "Samoa",
      "name": "Samoa",
      "dial_code": "685",
      "countryid": "207",
      "code": "WS",
      "isocode": "WSM"
    },
    {
      "countryname": "San Marino",
      "name": "San Marino",
      "dial_code": "378",
      "countryid": "86",
      "code": "SM",
      "isocode": "SMR"
    },
    {
      "countryname": "Sao Tome and Principe",
      "name": "Sao Tome and Principe",
      "dial_code": "239",
      "countryid": "181",
      "code": "ST",
      "isocode": "STP"
    },
    {
      "countryname": "Saudi Arabia",
      "name": "Saudi Arabia",
      "dial_code": "966",
      "countryid": "129",
      "code": "SA",
      "isocode": "SAU"
    },
    {
      "countryname": "Senegal",
      "name": "Senegal",
      "dial_code": "221",
      "countryid": "182",
      "code": "SN",
      "isocode": "SEN"
    },
    {
      "countryname": "Serbia",
      "name": "Serbia",
      "dial_code": "381",
      "countryid": "87",
      "code": "RS",
      "isocode": "SRB"
    },
    {
      "countryname": "Seychelles",
      "name": "Seychelles",
      "dial_code": "248",
      "countryid": "183",
      "code": "SC",
      "isocode": "SYC"
    },
    {
      "countryname": "Sierra Leone",
      "name": "Sierra Leone",
      "dial_code": "232",
      "countryid": "184",
      "code": "SL",
      "isocode": "SLE"
    },
    {
      "countryname": "Singapore",
      "name": "Singapore",
      "dial_code": "65",
      "countryid": "130",
      "code": "SG",
      "isocode": "SGP"
    },
    {
      "countryname": "Slovakia",
      "name": "Slovakia",
      "dial_code": "421",
      "countryid": "88",
      "code": "SK",
      "isocode": "SVK"
    },
    {
      "countryname": "Slovenia",
      "name": "Slovenia",
      "dial_code": "386",
      "countryid": "89",
      "code": "SI",
      "isocode": "SVN"
    },
    {
      "countryname": "Solomon Islands",
      "name": "Solomon Islands",
      "dial_code": "677",
      "countryid": "208",
      "code": "SB",
      "isocode": "SLB"
    },
    {
      "countryname": "Somalia",
      "name": "Somalia",
      "dial_code": "252",
      "countryid": "185",
      "code": "SO",
      "isocode": "SOM"
    },
    {
      "countryname": "South Africa",
      "name": "South Africa",
      "dial_code": "27",
      "countryid": "186",
      "code": "ZA",
      "isocode": "ZAF"
    },
    {
      "countryname": "South Korea",
      "name": "South Korea",
      "dial_code": "82",
      "countryid": "131",
      "code": "KR",
      "isocode": "KOR"
    },
    {
      "countryname": "Spain",
      "name": "Spain",
      "dial_code": "34",
      "countryid": "90",
      "code": "ES",
      "isocode": "ESP"
    },
    {
      "countryname": "Sri Lanka",
      "name": "Sri Lanka",
      "dial_code": "94",
      "countryid": "132",
      "code": "LK",
      "isocode": "LKA"
    },
    {
      "countryname": "Sudan",
      "name": "Sudan",
      "dial_code": "249",
      "countryid": "187",
      "code": "SD",
      "isocode": "SDN"
    },
    {
      "countryname": "Suriname",
      "name": "Suriname",
      "dial_code": "597",
      "countryid": "40",
      "code": "SR",
      "isocode": "SUR"
    },
    {
      "countryname": "Swaziland",
      "name": "Swaziland",
      "dial_code": "268",
      "countryid": "188",
      "code": "SZ",
      "isocode": "SWZ"
    },
    {
      "countryname": "Sweden",
      "name": "Sweden",
      "dial_code": "46",
      "countryid": "91",
      "code": "SE",
      "isocode": "SWE"
    },
    {
      "countryname": "Switzerland",
      "name": "Switzerland",
      "dial_code": "41",
      "countryid": "92",
      "code": "CH",
      "isocode": "CHE"
    },
    {
      "countryname": "Syria",
      "name": "Syria",
      "dial_code": "963",
      "countryid": "133",
      "code": "SY",
      "isocode": "SYR"
    },
    {
      "countryname": "Taiwan",
      "name": "Taiwan",
      "dial_code": "886",
      "countryid": "134",
      "code": "TW",
      "isocode": "TWN"
    },
    {
      "countryname": "Tajikistan",
      "name": "Tajikistan",
      "dial_code": "992",
      "countryid": "135",
      "code": "TJ",
      "isocode": "TJK"
    },
    {
      "countryname": "Tanzania",
      "name": "Tanzania",
      "dial_code": "255",
      "countryid": "189",
      "code": "TZ",
      "isocode": "TZA"
    },
    {
      "countryname": "Thailand",
      "name": "Thailand",
      "dial_code": "66",
      "countryid": "136",
      "code": "TH",
      "isocode": "THA"
    },
    {
      "countryname": "Togo",
      "name": "Togo",
      "dial_code": "228",
      "countryid": "190",
      "code": "TG",
      "isocode": "TGO"
    },
    {
      "countryname": "Trinidad and Tobago",
      "name": "Trinidad and Tobago",
      "dial_code": "1868",
      "countryid": "27",
      "code": "TT",
      "isocode": "TTO"
    },
    {
      "countryname": "Tunisia",
      "name": "Tunisia",
      "dial_code": "216",
      "countryid": "191",
      "code": "TN",
      "isocode": "TUN"
    },
    {
      "countryname": "Turkey",
      "name": "Turkey",
      "dial_code": "90",
      "countryid": "93",
      "code": "TR",
      "isocode": "TUR"
    },
    {
      "countryname": "Turkmenistan",
      "name": "Turkmenistan",
      "dial_code": "993",
      "countryid": "137",
      "code": "TM",
      "isocode": "TKM"
    },
    {
      "countryname": "Tuvalu",
      "name": "Tuvalu",
      "dial_code": "688",
      "countryid": "210",
      "code": "TV",
      "isocode": "TUV"
    },
    {
      "countryname": "Uganda",
      "name": "Uganda",
      "dial_code": "256",
      "countryid": "192",
      "code": "UG",
      "isocode": "UGA"
    },
    {
      "countryname": "Ukraine",
      "name": "Ukraine",
      "dial_code": "380",
      "countryid": "94",
      "code": "UA",
      "isocode": "UKR"
    },
    {
      "countryname": "United Arab Emirates",
      "name": "United Arab Emirates",
      "dial_code": "971",
      "countryid": "138",
      "code": "AE",
      "isocode": "ARE"
    },
    {
      "countryname": "United Kingdom",
      "name": "United Kingdom",
      "dial_code": "44",
      "countryid": "95",
      "code": "GB",
      "isocode": "GBR"
    },
    {
      "countryname": "United States",
      "name": "United States",
      "dial_code": "1",
      "countryid": "1",
      "code": "US",
      "isocode": "USA"
    },
    {
      "countryname": "Uruguay",
      "name": "Uruguay",
      "dial_code": "598",
      "countryid": "41",
      "code": "UY",
      "isocode": "URY"
    },
    {
      "countryname": "Uzbekistan",
      "name": "Uzbekistan",
      "dial_code": "998",
      "countryid": "139",
      "code": "UZ",
      "isocode": "UZB"
    },
    {
      "countryname": "Vanuatu",
      "name": "Vanuatu",
      "dial_code": "678",
      "countryid": "211",
      "code": "VU",
      "isocode": "VUT"
    },
    {
      "countryname": "Venezuela",
      "name": "Venezuela",
      "dial_code": "58",
      "countryid": "42",
      "code": "VE",
      "isocode": "VEN"
    },
    {
      "countryname": "Vietnam",
      "name": "Vietnam",
      "dial_code": "84",
      "countryid": "140",
      "code": "VN",
      "isocode": "VNM"
    },
    {
      "countryname": "Wallis and Futuna",
      "name": "Wallis and Futuna",
      "dial_code": "681",
      "countryid": "212",
      "code": "WF",
      "isocode": "WLF"
    },
    {
      "countryname": "Western Sahara",
      "name": "Western Sahara",
      "dial_code": "212",
      "countryid": "193",
      "code": "EH",
      "isocode": "ESH"
    },
    {
      "countryname": "Yemen",
      "name": "Yemen",
      "dial_code": "967",
      "countryid": "141",
      "code": "YE",
      "isocode": "YEM"
    },
    {
      "countryname": "Zambia",
      "name": "Zambia",
      "dial_code": "260",
      "countryid": "194",
      "code": "ZM",
      "isocode": "ZMB"
    },
    {
      "countryname": "Zimbabwe",
      "name": "Zimbabwe",
      "dial_code": "263",
      "countryid": "195",
      "code": "ZW",
      "isocode": "ZWE"
    }
  ]
  const [selectedDialCode, setSelectedDialCode] = useState("91");
//console.log(data && data.hInfo && data.hInfo.cnt && data.hInfo.cnt.ph);
  const handleDialCodeChange = (event) => {
    setSelectedDialCode(event.target.value);
  };
  const calculateDateDifference = (checkinDate, checkoutDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const differenceInTime = checkout - checkin; // Difference in milliseconds
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert to days
    return differenceInDays;
  };

  // Calculate the difference
  const nightCount = data ? calculateDateDifference(data.query.checkinDate, data.query.checkoutDate) : 0;

  const renderImages = (images) => {
    if (images.length === 0) return null; // Return null if there are no images
  
    const image = images[0]; // Get the first image
    return (
      <img
        key={0} // Use a constant key since we're only rendering one image
        src={image.url}
        alt="Hotel Image"
        style={{ width: '150px', height: '100px', marginRight: '8px', borderRadius: '4px' }}
      />
    );
  };

  return (
    <div style={{ padding: '16px', maxWidth:"1200px", margin: '0 auto' }}>
      <div className="container">
      {/* Left Section */}
      <div className="left-section">
       <Grid container spacing={2} >
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '4fr' }}>
  <h1 className="hotel-name" style={{textAlign:'left'}}>{data.hInfo.name}</h1>
        <p className="hotel-tag" style={{textAlign:'left'}}>{data.hInfo.pt}</p>
        <p className="hotel-address" style={{textAlign:'left',fontWeight:'bolder'}}>
          {data.hInfo.ad.adr}, {data.hInfo.ad.state.name}, {data.hInfo.ad.country.name}
        </p>
  </Grid>
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '0.5fr',alignContent:"right" }}>
  <div style={{textAlign:'right'}}>{renderImages(data.hInfo.img)}</div>
  </Grid>
</Grid> 
        

        {/* Booking Details */}
        <div className="booking-details">
          <div>
            <strong>CHECK IN</strong>
            <p>{data.query.checkinDate}</p>
            
          </div>
          <div>
            {/* <strong>1 NIGHT</strong> */}
            <strong>{nightCount} NIGHT{nightCount !== 1 ? 'S' : ''}</strong>
          </div>
          <div>
            <strong>CHECK OUT</strong>
            <p>{data.query.checkoutDate}</p>
            
          </div>
        </div>

        {/* Room Details */}
        <div className="room-details">
          <h2 style={{textAlign:'left'}}>{data.hInfo.ops[0].ris[0]?.srn}</h2>
          <p style={{textAlign:'left'}}>{data.hInfo.ops[0].ris[0]?.adt} Adults {data.hInfo.ops[0].ris[0]?.chd > 0 && `, ${data.hInfo.ops[0].ris[0]?.chd} Children`}</p>
          
          <p>{data.hInfo.fl.join(', ')}</p>
         
          <div>
            <p className="policy-link" >
            <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Review Details
        </Typography>
        {data && data.alerts.length > 0 ? (
          data.alerts.map((alert, index) => {
            const cnpDetails = getCnpDetails(alert);
            return (
              <Paper
                key={index}
                elevation={1}
                style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#ffe9e9' }}
              >
                
                <Button
                  variant="outlined"
                  onClick={() => openModal(cnpDetails)}
                  style={{ marginTop: '8px' }}
                >
                  View CNP Details
                </Button>
              </Paper>
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No alerts available.
          </Typography>
        )}
      </Paper>

      {/* Modal for CNP Details */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {modalData ? (
            <div>
              <Typography id="modal-title" variant="h6" component="h2">
                CNP Details
              </Typography>
              {/* <Typography id="modal-description" sx={{ mt: 2 }}>
                IFRA: {modalData.ifra ? "True" : "False"}
              </Typography>
              <Typography>INRA: {modalData.inra ? "True" : "False"}</Typography> */}
              <Typography>Pricing Details:</Typography>
              <ul>
                {modalData.pd.map((period, index) => (
                  <li key={index}>
                    From: {period.fdt}, To: {period.tdt}, Amount: ₹{period.am}
                  </li>
                ))}
              </ul>
              <Button onClick={closeModal} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Close
              </Button>
            </div>
          ) : (
            <Typography>No data to display</Typography>
          )}
        </Box>
      </Modal>
              </p>
            <div>
     
    </div>
            {/* {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Cancellation Policy</h2>
                        <p>.</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )} */}
        </div>
        </div>

        {/* Important Information */}
        <div className="important-info">
          <h3>Contact Information</h3>
          <div>
            <p>
              {data.hInfo.ad.adr}, {data.hInfo.ad.city.name}, {data.hInfo.ad.state.name}, {data.hInfo.ad.country.name}
            </p>
            <p>Phone: {data.hInfo.cnt.ph}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Price Breakup */}
        <div className="price-breakup">
          <h3>Price Breakup</h3>
          <div className="price-row">
            <span>{nightCount} NIGHT{nightCount !== 1 ? 'S' : ''}</span>
            <span>{}</span>
          </div>
          <div className="price-row">
            <span>Total</span>
            <span>{data.hInfo.ops[0]?.tp}</span>
          </div>
          
          <div className="total-price">
            <strong>Total Amount to be paid</strong>
            <strong>{data.hInfo.ops[0]?.tp}</strong>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="coupon-section">
          <h3>Coupon Codes</h3>
          <div className="coupon">
            <input type="radio" id="coupon1" name="coupon" />
            <label htmlFor="coupon1">
              <strong>MMTBIG5G</strong>
              <p>
                Enjoy 3-Month No-Cost EMI on Credit Cards from HDFC, ICICI, SBI,
                Axis, and more!
              </p>
            </label>
          </div>
          <p>MMT Gift Cards can be applied at payment step</p>
          <div className="apply-coupon">
            <input type="text" placeholder="Have a Coupon Code?" />
            <button>→</button>
          </div>
        </div>
      </div>
    </div>
     
    <Box p={3} sx={{ maxWidth: 1200, margin: "auto" }}>
      <Grid container spacing={2}>
        {/* Hotel Details */}
        <Grid item xs={12} md={8}>
         
          
        </Grid>

        {/* Fare Summary */}
        

        {/* Guest Details */}
        <Grid item xs={12}>
          <Typography variant="h6">Guest Details (Only Lead Guest Name is Required)</Typography>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <Select fullWidth defaultValue="Mr">
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Ms">Ms</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Lead Pax First Name" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label="Last Name" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Contact Details */}
        <Grid item xs={12}>
          <Typography variant="h6">Contact Details</Typography>
          <Box mt={2}>
            <Grid container spacing={2}>
            <Grid item xs={3}>
                <Select
                  fullWidth
                  value={selectedDialCode}
                  onChange={handleDialCodeChange}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.dial_code}>
                      +{country.dial_code} ({country.name})
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={9}>
                <TextField fullWidth label="Mobile No." />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email ID" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Special Requests */}
        <Grid item xs={12}>
          <Typography variant="h6">Special Request(s) (Optional)</Typography>
          <Box mt={2}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter any special requests here"
            />
          </Box>
        </Grid>

        {/* Proceed Button */}
        <Grid item xs={12}>
          <Typography variant="caption" color="error">
            *PAN is required at the time of voucher.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Review
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default ReviewPage;
