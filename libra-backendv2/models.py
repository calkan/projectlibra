from .app import app, db, ma, bcrypt

# User Model
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  public_id = db.Column(db.String(50), unique=True)
  username = db.Column(db.String(50))
  name = db.Column(db.String(80))
  email = db.Column(db.String(80))
  password = db.Column(db.String(80))
  admin = db.Column(db.Boolean)
  ph_thrs = db.Column(db.Float())
  gn_thrs = db.Column(db.Float())
  projects = db.relationship('Project', backref='user')

class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'username', 'name', 'email', 'ph_thrs', 'gn_thrs')

user_schema = UserSchema()

class Project(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  desc = db.Column(db.Text())
  disease = db.Column(db.Text())
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  files = db.relationship('File', backref='project')
  patients = db.relationship("Patient", secondary="patient_project")

class ProjectSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'desc', 'disease')

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)

class File(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(200))
  path = db.Column(db.String(300))
  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

class FileSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'path')

file_schema = FileSchema()
files_schema = FileSchema(many=True)

class Vcf(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  filename = db.Column(db.String(50))
  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
  chrom = db.Column(db.String(5))
  pos = db.Column(db.Integer)
  # need to fix the following column types into more appropriate ones
  variant_id = db.Column(db.String(50))
  ref = db.Column(db.String(50))
  alt = db.Column(db.String(50))
  qual = db.Column(db.String(50))
  filter = db.Column(db.String(100))
  info = db.Column(db.Text())
  #sample_id = db.Column(db.String(100))
  #sample_data = db.Column(db.String(100))
  samples = db.relationship('Sample', backref='vcf')
  alelle = db.Column(db.Text())
  annotation = db.Column(db.Text())
  annotation_impact = db.Column(db.Text())
  gene_name = db.Column(db.Text())
  gene_id = db.Column(db.Text())
  feature_type = db.Column(db.Text())
  feature_id = db.Column(db.Text())
  dominant = db.Column(db.Boolean)
  recessive = db.Column(db.Boolean)

class VcfSchema(ma.Schema):
  class Meta:
    fields = ('id', 'filename', 'chrom', 'pos', 'variant_id', 'ref',
              'alt', 'qual', 'filter', 'info')
    #fields = ('id', 'filename', 'chrom', 'pos', 'variant_id', 'ref',
    #          'alt', 'qual', 'filter', 'info', 'sample_id', 'sample_data')

vcf_schema = VcfSchema()
vcfs_schema = VcfSchema(many=True)

'''class VCFsSamzzple(db.Model):
  vcf_id = db.Column(db.Integer, db.ForeignKey('vc_fs.id'), primary_key=True)
  sample_id = db.Column(db.String(100), db.ForeignKey('sample.id'), primary_key=True)

class VCFsSampleSchema(ma.Schema):
  class Meta:
    fields = ('vcf_id', 'sample_id')

vcfssample_schema = VCFsSampleSchema()'''

class Sample(db.Model):
  sample_id = db.Column(db.String(100), primary_key=True)
  vcf_id = db.Column(db.Integer, db.ForeignKey('vcf.id'), primary_key=True)
  sample_data = db.Column(db.String(100))

class SampleSchema(ma.Schema):
  class Meta:
    fields = ('sample_id', 'vcf_id', 'sample_data')

sample_schema = SampleSchema()

class Patient(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  diagnosis = db.Column(db.Text())
  patient_contact = db.Column(db.String(80))
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  hpo_tag = db.relationship('HPOTag', backref='patient')
  hpo_tag_names = db.Column(db.Text())
  hpo_tag_ids = db.Column(db.Text())
  go_tag_ids = db.Column(db.Text())
  resolve_state = db.Column(db.Boolean, default=False, nullable=False)
  gene_names = db.relationship("GeneName", secondary="patient_gene_names")
  gene_ids = db.relationship("GeneId", secondary="patient_gene_ids")
  projects = db.relationship("Project", secondary="patient_project")

class PatientSchema(ma.Schema):
  class Meta:
    fields = ('id','name','patient_contact','diagnosis','hpo_tag_names', 'hpo_tag_ids', 'go_tag_ids')

patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)

class HPOTag(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  hpo_tag_id = db.Column(db.String(50))
  hpo_tag_name = db.Column(db.String(50))
  patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
  resolve_state = db.Column(db.Boolean, default=False, nullable=False)

class HPOSchema(ma.Schema):
  class Meta:
    fields = ('id','hpo_tag_name','hpo_tag_id','resolve_state')

HPO_schema = HPOSchema()
HPOs_schema = HPOSchema(many=True)

class Similarity(db.Model):
  patient_pair = db.Column(db.String(50), primary_key=True)
  hpo_similarity = db.Column(db.Float)
  go_similarity = db.Column(db.Float)

class SimilaritySchema(ma.Schema):
  class Meta:
    fields = ('patient_pair', 'hpo_similarity', 'go_similiarity')

Similarity_schema = SimilaritySchema()
Similarities_schema = SimilaritySchema(many=True)

class GeneName(db.Model):
  __tablename__ = "gene_name"
  name = db.Column(db.Text(), primary_key=True)
  patients = db.relationship("Patient", secondary="patient_gene_names")

class GeneId(db.Model):
  __tablename__ = "gene_id"
  gene_id = db.Column(db.Text(), primary_key=True)
  patients = db.relationship("Patient", secondary="patient_gene_ids")

class PatientGeneName(db.Model):
  __tablename__ = "patient_gene_names"
  patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), primary_key=True)
  gene_name = db.Column(db.Text(), db.ForeignKey('gene_name.name'), primary_key=True)
  anno = db.Column(db.String(100))

class PatientGeneNameSchema(ma.Schema):
  class Meta:
    fields = ('patient_id', 'gene_name', 'anno')

PatientGeneName_schema = PatientGeneNameSchema()
PatientGeneNames_schema = PatientGeneNameSchema(many=True)

class PatientGeneID(db.Model):
  __tablename__ = "patient_gene_ids"
  id = db.Column(db.Integer, primary_key=True)
  patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
  gene_id = db.Column(db.Text(), db.ForeignKey('gene_id.gene_id'))

class PatientProject(db.Model):
  __tablename__ = "patient_project"
  patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), primary_key=True)
  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), primary_key=True)
  has_disease = db.Column(db.Boolean)
