import groovy.json.JsonSlurper
import groovy.json.JsonOutput

def fetchAndSaveJson(year) {
    // Fetch the JSON data from the URL
    def url = "https://litcal.johnromanodorazio.com/api/v3/LitCalEngine.php?year=${year}&locale=EN"
    def jsonText = new URL(url).text
    def data = new JsonSlurper().parseText(jsonText)

    // Define the keys you want to keep
    def keysToKeep = ['name', 'color', 'month', 'day', 'year', 'type', 'gradeLcl', 'liturgicalYear', 'liturgicalSeason']

    // Filter out objects where "type" == "mobile" and "gradeLcl" starts with "Optional"
    def filteredEvents = data.LitCal.findAll { k, v ->
        !v.gradeLcl.startsWith('Optional') && !v.isVigilMass //&& v.type != 'mobile'
    }.collectEntries { k, v ->
        // Adjust the color key if necessary
        if (v.color instanceof List) {
            if (v.color.size() == 1) {
                v.color = v.color[0]
            } else if (v.color.contains('red')) {
                v.color = 'red'
            }
        }
        [k, v.subMap(keysToKeep)]
    }

    // Restructure the data
    def restructuredData = [:]
    filteredEvents.each { k, v ->
        def y = v.year
        def m = v.month
        def d = v.day
        if (!y || !m || !d) {
            println "Skipping null key: $k"
            return
        }
        if (!restructuredData[y]) restructuredData[y] = [:]
        if (!restructuredData[y][m]) restructuredData[y][m] = [:]
        restructuredData[y][m][d] = v
    }

    return restructuredData
}

def mergeObjects(obj1, obj2) {
    obj2.each { k, v ->
        if (obj1.containsKey(k)) {
            if (obj1[k] instanceof Map && v instanceof Map) {
                obj1[k] = mergeObjects(obj1[k], v)
            } else {
                obj1[k] = v
            }
        } else {
            obj1[k] = v
        }
    }
    return obj1
}

def allData = [:]

for (year in 2024..2100) {
    allData = mergeObjects(allData, fetchAndSaveJson(year))
}

allData.each { k, v ->
    def outputFile = new File("${k}_data.json")
    outputFile.write(JsonOutput.prettyPrint(JsonOutput.toJson(v)))
    println "Data written to ${k}_data.json"
}
