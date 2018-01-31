import json, sys

years = {
	'20142': 'December 2014',
	'20151': 'June 2015',
	'20152': 'December 2015',
	'20161': 'June 2016',
	'20162': 'December 2016'
}

with open('shapefile_codes.txt') as f:
	sf_codes = [x.replace('1500000US', '') for x in f.read().split('\n')]

out = {}
for (code, year) in years.items():
	with open('blocks-{}.json'.format(code)) as f:
		y = [x for x in json.load(f) if x in sf_codes]
	out[year] = y

json.dump(out, sys.stdout)