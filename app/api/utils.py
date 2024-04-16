import ezdxf
from ezdxf.addons.drawing import Frontend, RenderContext, svg, layout
import math
import io


def generate_gasket_dxf(inside_diameter, outside_diameter, number):
    doc = ezdxf.new()
    msp = doc.modelspace()

    # Define grid parameters
    grid_spacing = 5 + outside_diameter # Spacing between shapes in the grid
    rows = cols = int(number ** 0.5)  # Calculate number of rows and columns in the grid

    for i in range(rows):
        for j in range(cols):
            x_offset = i * grid_spacing
            y_offset = j * grid_spacing

            # Calculate coordinates for inside and outside circles with offsets
            inside_circle = msp.add_circle(center=(x_offset, y_offset), radius=inside_diameter/2)
            outside_circle = msp.add_circle(center=(x_offset, y_offset), radius=outside_diameter/2)

    # Save the DXF file
    doc.saveas('gasket_template_grid.dxf')

# Call function with user input
generate_gasket_dxf(10, 20, 4)  # Generates a 2x2 grid of gaskets





def generate_gasket_with_bolt_holes(inner_diameter, outer_diameter, num_bolt_holes, bolt_hole_ring_diameter, bolt_hole_size):
    doc = ezdxf.new()
    msp = doc.modelspace()

    # Calculate positions for bolt holes
    angle_step = 360 / num_bolt_holes
    bolt_hole_positions = [(bolt_hole_ring_diameter/2 * math.cos(math.radians(angle_step * i)), 
                            bolt_hole_ring_diameter/2 * math.sin(math.radians(angle_step * i))) 
                            for i in range(num_bolt_holes)]

    # Add gasket shape
    inner_circle = msp.add_circle(center=(0, 0), radius=inner_diameter/2)
    outer_circle = msp.add_circle(center=(0, 0), radius=outer_diameter/2)

    # Add bolt hole ring
    # bolt_hole_ring = msp.add_circle(center=(0, 0), radius=bolt_hole_ring_diameter/2)

    # Add individual bolt holes
    for position in bolt_hole_positions:
        msp.add_circle(center=position, radius=bolt_hole_size/2)

    # Set attributes for entities

    # Save the DXF file
    doc.saveas('gasket_with_bolt_holes.dxf')

# Call function with user input
# generate_gasket_with_bolt_holes(10, 20, 6, 15, 1)

# Call function with user input
# generate_gasket_dxf(20, 50)
    
def create_svg(doc, file_name):
    msp = doc.modelspace()
    # 1. create the render context
    context = RenderContext(doc)
    # 2. create the backend
    backend = svg.SVGBackend()
    # 3. create the frontend
    frontend = Frontend(context, backend)
    # 4. draw the modelspace
    frontend.draw_layout(msp)
    # 5. create an A4 page layout, not required for all backends
    page = layout.Page(0, 0, layout.Units.mm, margins=layout.Margins.all(2))
    # 6. get the SVG rendering as string - this step is backend dependent
    svg_string = backend.get_string(page)
    with open(file_name, "wt", encoding="utf8") as fp:
        fp.write(svg_string)