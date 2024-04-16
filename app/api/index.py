from flask import Flask, jsonify, request, send_file
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.backend import Backend
from PIL import Image
from utils import create_svg

import ezdxf
import io

app = Flask(__name__)

@app.route('/generate_gasket', methods=['POST'])
def generate_gasket():
    data = request.get_json()
    inside_diameter = float(data.get('inside_diameter'))
    outside_diameter = float(data.get('outside_diameter'))
    rows = int(data.get('rows'))
    cols = int(data.get('cols'))
    spacing = float(data.get('spacing'))
    file_name = data.get('fileName') if data.get('fileName') else 'untitled'
    shouldMakeFile = data.get('shouldMakeFile')
    doc = ezdxf.new()
    msp = doc.modelspace()

    if rows > 1 or cols > 1:
        # Define grid parameters
        grid_spacing = spacing + outside_diameter # Spacing between shapes in the grid
        done = 0
        
        for i in range(cols):            
            for j in range(rows):
                x_offset = i * grid_spacing
                y_offset = j * grid_spacing

                # Calculate coordinates for inside and outside circles with offsets
                inside_circle = msp.add_circle(center=(x_offset, y_offset), radius=inside_diameter/2)
                outside_circle = msp.add_circle(center=(x_offset, y_offset), radius=outside_diameter/2)
                done += 1
    else:
        inside_circle = msp.add_circle(center=(0, 0), radius=inside_diameter/2)
        outside_circle = msp.add_circle(center=(0, 0), radius=outside_diameter/2)        
    
    if shouldMakeFile:
    # Save the DXF file
        doc.header['$INSUNITS'] = 1 # Set units to inches
        doc.header['$MEASUREMENT'] = 0 # Set measurement to english
        doc.saveas('{}.dxf'.format(file_name))
        return send_file('{}.dxf'.format(file_name), as_attachment=True)
    else:
        create_svg(doc, '{}.svg'.format(file_name))
        return send_file('{}.svg'.format(file_name), as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5328)
