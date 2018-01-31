import csv, sys, json

out = []
with open(sys.argv[1]) as f:
	reader = csv.DictReader(f)
	for row in reader:
		if 'verizon' in row['ProviderName'].lower() and int(row['Consumer']) == 1 and int(row['TechCode']) == 50:
			if row['BlockCode'] not in out:
				out.append(row['BlockCode'])

json.dump(out, sys.stdout)