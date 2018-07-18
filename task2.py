import json
from pprint import pprint


# function to get textures of given set
def getTextures(_set,source):
  textureName = str(_set["name"])+'_'+str(_set["id"])
  return source["model_info"]["textures"][textureName]["diffuse"]

# function to get Sets of the given material
def getSets (material,destDictionary, source):
  setName = str(material["name"])+'_'+str(material["id"])
  j=0
  setlist=[]
  for _set in source["model_info"]["sets"][setName]:
    setlist.append(None)
    setlist[j]=source["model_info"]["sets"][setName][j]
    setlist[j]["texture"]=(getTextures(_set,source))
    j+=1
  return (setlist)


# function to format dictionary
def formatDict(destDictionary,sourceDictionary):
  materials = sourceDictionary["model_info"]["materials"]
  i=0
  destDictionary["model_info"]={}
  destDictionary["model_info"]["materials"]=[]
  for mat in materials:
    destDictionary["model_info"]["materials"].append(None)
    destDictionary["model_info"]["materials"][i]=sourceDictionary["model_info"]["materials"][i]
    destDictionary["model_info"]["materials"][i]["sets"]=  getSets(mat,destDictionary,sourceDictionary)
    i+=1
  return True

# opening "finalJson" to read and loading json in a variable
with open("finalJson.json", 'r') as f:
  datastore = json.load(f)
newDict = {}
newDict.setdefault('permutation_info',datastore["permutations_info"])
formatDict(newDict,datastore)

with open("output.json", 'w') as f:
  json.dump(newDict, f)



