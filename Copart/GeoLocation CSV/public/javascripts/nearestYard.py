#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Apr  4 14:28:33 2017

@author: vinaya
"""

import numpy as np

import pandas as pd
import math
import sys

dataset = pd.read_csv("zip_codes_states.csv")

def distance(lat1, lng1, lat2, lng2):
    #return distance as meter if you want km distance, remove "* 1000"
    #print(lat1, lng1, lat2, lng2)
    radius = 6371 * 1000 

    dLat = (lat2-lat1) * math.pi / 180
    dLng = (lng2-lng1) * math.pi / 180

    lat1 = lat1 * math.pi / 180
    lat2 = lat2 * math.pi / 180

    val = math.sin(dLat/2) * math.sin(dLat/2) + math.sin(dLng/2) * math.sin(dLng/2) * math.cos(lat1) * math.cos(lat2)    
    ang = 2 * math.atan2(math.sqrt(val), math.sqrt(1-val))
    return radius * ang

array = []
lat2 = sys.argv[1]
lng2 = sys.argv[2]


for index, row in dataset.iterrows():
    if (row['latitude']==np.nan) or (row['longitude']==np.nan):
        continue
    array.append(distance(row['latitude'],row['longitude'],lat2,lng2))
  
index = array.index(min(array))
print("city ",dataset['city'][index]," state ",dataset['state'][index]," county ",dataset['county'][index])